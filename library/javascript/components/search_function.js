var search_input = document.getElementById('search-input');

var startPageNumber = 1;
var currPageListId;
var previousPageListId;
var searchResult;

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

if (search_input != null) {
  search_input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      search(e.target.value, 1);
    }
  });
  function search(words, currentPageID) {
    const PAGINATION_LIMIT = 10;
    if (startPageNumber === currentPageID && currentPageID != 1) {
      startPageNumber -= 1;
    }
    const URL = `https://elastic.channeli.in/xmlpages-000001/_search`;
    let data = {
      sort: [
        {
          _score: {
            order: 'desc',
          },
        },
      ],
      size: PAGINATION_LIMIT,
      from: (currentPageID - 1) * PAGINATION_LIMIT,
      query: {
        query_string: {
          default_field: 'search_keywords',
          query: words,
        },
      },
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'elastic.channeli.in');
    fetch(URL, {
      mode: 'cors',
      credentials: 'include',
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        var max_pages = res.hits.total.value;
        if (searchResult === undefined) searchResult = document.createElement('div');
        searchResult.setAttribute('id', 'results-list');
        searchResult.style.zIndex = '10000';
        searchResult.style.width = '100vw';
        searchResult.style.height = '100vh';
        searchResult.style.paddingTop = '5vh';
        searchResult.style.position = 'absolute';
        searchResult.style.background = 'white';
        searchResult.style.top =
          document
            .getElementsByClassName('main-head')[0]
            .getBoundingClientRect().bottom + 'px';
        if (max_pages === 0) {
          searchResult.innerHTML = `<div class="description-container">
          <div class="ui description center">
          No search results 
          </div>
          </div>`;
          document.body.appendChild(searchResult);
        } else {
          list_html = '';
          const { hits } = res;
          let { hits: pages } = hits;
          pages = pages.map((e) => e._source);
          for (let page = 0; page < pages.length; page++) {
            list_html +=
              `<div class="publicationListItem">
                    <div class="title-bar">
                    <div class="ui intro-text">` +
              pages[page].title +
              `</div>
                    <a href=` +
              `"${pages[page].page_link}"` +
              ` class="ui button" target='_blank'>View</a>
                    </div>
                    <div class="ui intro-text">` +
              pages[page].description +
              `</div>
                    <hr>
                    </div>`;
          }

          searchResult.innerHTML =
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
                <script  src="https://cmsredesign.channeli.in/library/javascript/components/publication-list.js"></script>`;

          document.body.appendChild(searchResult);
          const paginationNumbers =
            document.getElementById('pagination-numbers');
          var paginatedList = document.getElementById('paginated-list');
          var listItems = document.querySelectorAll('.publicationListItem');
          const nextButton = document.getElementById('next-button');
          const prevButton = document.getElementById('prev-button');
          let maxPageCount = Math.ceil(max_pages / PAGINATION_LIMIT);

          if (currentPageID === startPageNumber + PAGINATION_LIMIT - 1) {
            startPageNumber += 1;
          }
          let currentPage = currentPageID;
          const disableButton = (button) => {
            button.classList.add('paginated-disabled');
            button.setAttribute('disabled', true);
          };
          const enableButton = (button) => {
            button.classList.remove('paginated-disabled');
            button.removeAttribute('disabled');
          };
          const handlePageButtonsStatus = () => {
            if (currentPage === 1) {
              disableButton(prevButton);
            } else {
              enableButton(prevButton);
            }

            if (maxPageCount === currentPage) {
              disableButton(nextButton);
            } else {
              enableButton(nextButton);
            }
          };

          const handleActivePageNumber = () => {
            document
              .querySelectorAll('.pagination-number')
              .forEach((button) => {
                button.classList.remove('paginated-active');
                const pageIndex = Number(button.getAttribute('page-index'));
                if (pageIndex == currentPage) {
                  button.classList.add('paginated-active');
                }
              });
          };

          const appendPageNumber = (index) => {
            const pageNumber = document.createElement('button');
            pageNumber.className = 'pagination-number';
            pageNumber.innerHTML = index;
            pageNumber.setAttribute('page-index', index);
            pageNumber.setAttribute('aria-label', 'Page ' + index);

            paginationNumbers.appendChild(pageNumber);
          };

          const getPaginationNumbers = () => {
            for (
              let i = startPageNumber;
              i <
              Math.min(startPageNumber + PAGINATION_LIMIT, 1 + maxPageCount);
              i++
            ) {
              appendPageNumber(i);
            }
          };

          const setCurrentPage = (pageNum) => {
            currentPage = pageNum;

            handleActivePageNumber();
            handlePageButtonsStatus();
          };

          const pager = () => {
            getPaginationNumbers();
            setCurrentPage(currentPage);

            prevButton.addEventListener('click', () => {
              search(words, currentPage - 1);
            });

            nextButton.addEventListener('click', () => {
              search(words, currentPage + 1);
            });

            document
              .querySelectorAll('.pagination-number')
              .forEach((button) => {
                const pageIndex = Number(button.getAttribute('page-index'));

                if (pageIndex) {
                  button.addEventListener('click', () => {
                    search(words, pageIndex);
                  });
                }
              });
          };

          pager();
        }
        document.getElementById('search-modal')?.remove();
      });
  }
}
