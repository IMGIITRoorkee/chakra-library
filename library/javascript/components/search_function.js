var search_input = document.getElementById('search-input')
if(search_input!=null){
    search_input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            search(e)
        }
    })

    function search(e) {
        document.getElementById('search-modal').remove()
        const words = e.target.value;
        const Url = 'http://localhost:60000/chakra_search/?words='+words //TODO: Add URL in constants file
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')
        headers.append('Origin', 'localhost:5500')
        fetch(Url, {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
            headers: headers
        })
        .then(data=>{return data.json()})
        .then(res=>{
            list_html = ''
            for (let page=0; page < res.pages.length; page++) {
                list_html += `<div class="publicationListItem">
                    <div class="title-bar">
                    <div class="ui intro-text">`+res.pages[page].title+`</div>
                    <a href=`+res.pages[page].link+` class="ui button" target='_blank'>View</a>
                    </div>
                    <div class="ui intro-text">
                    Polyurethane incorporated Chitosan/alginate core-shell nanoparticles
                    for controlled oral insulin delivery.
                    </div>
                    <hr>
                    </div>`
            }
            var searchResult = document.createElement('div')
            searchResult.innerHTML += `<div class="ui full-width-container" style="max-height: 75vh; overflow-y: auto;">
                <div class="ui publication-list" id="paginated-list" style="overflow:auto;">`+list_html+`
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
                <script  src="http://localhost:5500/library/javascript/components/publication-list.js"></script>`

            searchResult.style.zIndex = '999'
            searchResult.style.width = '100vw'
            searchResult.style.height = '100vh'
            searchResult.style.position = 'absolute'
            searchResult.style.background = 'white'
            searchResult.style.top = document.getElementsByClassName('main-head')[0].getBoundingClientRect().bottom+'px'
            document.body.appendChild(searchResult)

            const paginationNumbers = document.getElementById("pagination-numbers");
            var paginatedList = document.getElementById('paginated-list')
            var listItems = document.querySelectorAll('.publicationListItem')
            const nextButton = document.getElementById("next-button");
            const prevButton = document.getElementById("prev-button");
            const paginationLimit = 5;
            const pageCount = Math.ceil(listItems.length / paginationLimit);
            let currentPage = 1
            const disableButton = (button) => {
                button.classList.add("paginated-disabled");
                button.setAttribute("disabled", true);
            };
            const enableButton = (button) => {
                button.classList.remove("paginated-disabled");
                button.removeAttribute("disabled");
            };
            const handlePageButtonsStatus = () => {
                if (currentPage === 1) {
                  disableButton(prevButton);
                } else {
                  enableButton(prevButton);
                }
              
                if (pageCount === currentPage) {
                  disableButton(nextButton);
                } else {
                  enableButton(nextButton);
                }
            };

            const handleActivePageNumber = () => {
                document.querySelectorAll(".pagination-number").forEach((button) => {
                  button.classList.remove("paginated-active");
                  const pageIndex = Number(button.getAttribute("page-index"));
                  if (pageIndex == currentPage) {
                    button.classList.add("paginated-active");
                  }
                });
            };

            const appendPageNumber = (index) => {
                const pageNumber = document.createElement("button");
                pageNumber.className = "pagination-number";
                pageNumber.innerHTML = index;
                pageNumber.setAttribute("page-index", index);
                pageNumber.setAttribute("aria-label", "Page " + index);
              
                paginationNumbers.appendChild(pageNumber);
            };

            const getPaginationNumbers = () => {
                for (let i = 1; i <= pageCount; i++) {
                  appendPageNumber(i);
                }
            };

            const setCurrentPage = (pageNum) => {
                currentPage = pageNum;
              
                handleActivePageNumber();
                handlePageButtonsStatus();
                
                const prevRange = (pageNum - 1) * paginationLimit;
                const currRange = pageNum * paginationLimit;
              
                listItems.forEach((item, index) => {
                  item.classList.add("paginated-hidden");
                  if (index >= prevRange && index < currRange) {
                    item.classList.remove("paginated-hidden");
                  }
                });
            };

            pager = () => {
                getPaginationNumbers();
                setCurrentPage(1);
              
                prevButton.addEventListener("click", () => {
                  setCurrentPage(currentPage - 1);
                });
              
                nextButton.addEventListener("click", () => {
                  setCurrentPage(currentPage + 1);
                });
              
                document.querySelectorAll(".pagination-number").forEach((button) => {
                  const pageIndex = Number(button.getAttribute("page-index"));
              
                  if (pageIndex) {
                    button.addEventListener("click", () => {
                      setCurrentPage(pageIndex);
                    });
                  }
                });
            };

            pager()
        })
    }
}
