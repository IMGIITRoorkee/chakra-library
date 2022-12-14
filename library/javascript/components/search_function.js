var search_input = document.getElementById('search-input')
if (search_input != null) {
  search_input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      search(e.target.value, 1)
    }
  })

  function search(words, currentPageID) {
    if (document.getElementById('search-modal') != null)
      document.getElementById('search-modal').remove()
    if (document.getElementById('pages-list') != null)
      document.getElementById('pages-list').remove()
    const Url = `http://localhost:8000/chakra_search/?words=${words}&page=${currentPageID}`
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Origin', 'localhost:9000')
    fetch(Url, {
      mode: 'cors',
      credentials: 'include',
      method: 'GET',
      headers: headers
    })
      .then(data => {
        return data.json()
      })
      .then(res => {
        var max_pages = res.max_pages
        var searchResult = document.createElement('div')
        searchResult.setAttribute('id', 'pages-list')

        if (max_pages === 0) {
          searchResult.innerHTML += `<div class="description-container">
          <div class="ui description center">
            No search results 
          </div>
        </div>`
          searchResult.style.zIndex = '999'
          searchResult.style.width = '100vw'
          searchResult.style.height = '100vh'
          searchResult.style.paddingTop = '10vh'
          searchResult.style.position = 'absolute'
          searchResult.style.background = 'white'
          searchResult.style.top =
            document
              .getElementsByClassName('main-head')[0]
              .getBoundingClientRect().bottom + 'px'
          document.body.appendChild(searchResult)
        } else {
          list_html = ''
          for (let page = 0; page < res.pages.length; page++) {
            console.log(res.pages[page].title)
            list_html +=
              `<div class="publicationListItem">
                    <div class="title-bar">
                    <div class="ui intro-text">` +
              res.pages[page].title +
              `</div>
                    <a href=` +
              res.pages[page].link +
              ` class="ui button" target='_blank'>View</a>
                    </div>
                    <div class="ui intro-text">` +
              res.pages[page].description +
              `</div>
                    <hr>
                    </div>`
          }

          searchResult.innerHTML +=
            `<div class="ui full-width-container" style="max-height: 75vh; overflow-y: auto;">
                <div class="ui section-heading">
                  Showing search results for <span style="color:rgba(26, 118, 187, 0.87)">${words}</span>
                </div>
                <div class="ui publication-list" id="paginated-list" style="overflow:auto;">` +
            list_html +
            `
                <br><br><br>
                <nav class="pagination-container">
                    <button class="pagination-button" id="prev-button" aria-label="Previous page" title="Previous page">
                    &lt;
                    </button>

                    <div id="pagination-numbers">

                    </div>

                    <button class="pagination-button" id="next-button" aria-label="Next page" title="Next page">
                    &gt;
                    </button>
                </nav>
                </div>
                </div>
                <script  src="http://localhost:9000/library/javascript/components/publication-list.js"></script>`

          searchResult.style.zIndex = '999'
          searchResult.style.width = '100vw'
          searchResult.style.height = '100vh'
          searchResult.style.paddingTop = '5vh'
          searchResult.style.position = 'absolute'
          searchResult.style.background = 'white'
          searchResult.style.top =
            document
              .getElementsByClassName('main-head')[0]
              .getBoundingClientRect().bottom + 'px'
          document.body.appendChild(searchResult)

          console.log(searchResult.outerHTML)

          const paginationNumbers =
            document.getElementById('pagination-numbers')
          var paginatedList = document.getElementById('paginated-list')
          var listItems = document.querySelectorAll('.publicationListItem')
          const nextButton = document.getElementById('next-button')
          const prevButton = document.getElementById('prev-button')
          const paginationLimit = 3
          const pageCount = Math.ceil(max_pages / paginationLimit)

          let currentPage = currentPageID
          const disableButton = button => {
            button.classList.add('paginated-disabled')
            button.setAttribute('disabled', true)
          }
          const enableButton = button => {
            button.classList.remove('paginated-disabled')
            button.removeAttribute('disabled')
          }
          const handlePageButtonsStatus = () => {
            if (currentPage === 1) {
              disableButton(prevButton)
            } else {
              enableButton(prevButton)
            }

            if (pageCount === currentPage) {
              disableButton(nextButton)
            } else {
              enableButton(nextButton)
            }
          }

          const handleActivePageNumber = () => {
            document.querySelectorAll('.pagination-number').forEach(button => {
              button.classList.remove('paginated-active')
              const pageIndex = Number(button.getAttribute('page-index'))
              if (pageIndex == currentPage) {
                button.classList.add('paginated-active')
              }
            })
          }

          const appendPageNumber = index => {
            const pageNumber = document.createElement('button')
            pageNumber.className = 'pagination-number'
            pageNumber.innerHTML = index
            pageNumber.setAttribute('page-index', index)
            pageNumber.setAttribute('aria-label', 'Page ' + index)

            paginationNumbers.appendChild(pageNumber)
          }

          const getPaginationNumbers = () => {
            for (let i = 1; i <= pageCount; i++) {
              appendPageNumber(i)
            }
          }

          const setCurrentPage = pageNum => {
            currentPage = pageNum

            handleActivePageNumber()
            handlePageButtonsStatus()
          }

          pager = () => {
            getPaginationNumbers()
            setCurrentPage(currentPage)

            prevButton.addEventListener('click', () => {
              search(words, currentPage - 1)
            })

            nextButton.addEventListener('click', () => {
              search(words, currentPage + 1)
            })

            document.querySelectorAll('.pagination-number').forEach(button => {
              const pageIndex = Number(button.getAttribute('page-index'))

              if (pageIndex) {
                button.addEventListener('click', () => {
                  search(words, pageIndex)
                })
              }
            })
          }

          pager()
        }
      })
  }
}
