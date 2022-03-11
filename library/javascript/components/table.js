function makeid (length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const tableMap = new Map()

function Pager (tableName, itemsPerPage, container) {
  this.tableName = tableName
  this.currentPage = 1
  this.pages = 0
  this.inited = false
  this.num_pages = itemsPerPage
  this.secretHash = makeid(24) + '-' + makeid(6)
  this.container = container
  let table = container.querySelector(".ui.table")
  this.isInverted = table.classList.contains("inverted")

  this.showRecords = function (from, to) {
    let rows = this.container.querySelector(`.${tableName}`).rows
    for (var i = 1; i < rows.length; i++) {
      if (i < from || i > to) rows[i].style.display = 'none'
      else rows[i].style.display = ''
    }
  }

  this.showPage = function (pageNumber) {
    if (!this.inited) {
      alert('not inited')
      return
    }

    this.currentPage = pageNumber
    let newPageAnchor = this.container.querySelector(
      '#pg' + this.secretHash + this.currentPage
    )
    newPageAnchor.className = 'ui pg-selected'


    let from = (pageNumber - 1) * Number(this.num_pages) + 1
    let to = from + Number(this.num_pages) - 1

    this.showRecords(from, to)
    let pgNext = this.container.querySelector(`.${this.pagerName}pgNext`)

    let pgPrev = this.container.querySelector(`.${this.pagerName}pgPrev`)

    if (pgNext != null) {
      if (this.currentPage === this.pages) pgNext.style.display = 'none'
      else pgNext.style.display = ''
    }
    if (pgPrev != null) {
      if (this.currentPage === 1) pgPrev.style.display = 'none'
      else pgPrev.style.display = ''
    }
  }
  this.pressPage = function (pageNumber) {
    this.createPager(
      Math.max(pageNumber - 1, 1),
      Math.min(pageNumber + 1, this.pages)
    )
    this.showPage(pageNumber)
  }
  this.prev = function () {
    if (this.currentPage > 1) {
      this.createPager(Math.max(this.currentPage - 2, 1), this.currentPage) // it  used to move the cursor to privious index.
      this.showPage(this.currentPage - 1)
    }
  }

  this.next = function () {
    if (this.currentPage < this.pages) {
      this.createPager(
        this.currentPage,
        Math.min(this.pages, this.currentPage + 2)
      )
      this.showPage(this.currentPage + 1)
    }
  }

  this.init = function () {
    let rows = document.querySelector(`.${tableName}`).rows

    let records = rows.length - 1
    this.pages = Math.ceil(records / this.num_pages)

    this.inited = true
  }

  this.createPager = function (startEle, EndEle) {
    let pagerName = 'pager'
    let inverted = this.isInverted ? 'inverted' : ''
    let pagerHtml = `<span id="${pagerName}pgPrev" class="ui pg-normal ${inverted}" onclick="call(this, 'prev')"> &#171 Prev</span>&nbsp;`
    if (startEle === 2) {
      let pgg = 1
      pagerHtml += `<span id="pg${this.secretHash}${pgg}" class="ui pg-normal ${inverted}" onclick="call(this,'pressPage', '${pgg}')">${pgg}</span>&nbsp;`
    }

    if (startEle > 2) {
      let pgg = 1
      pagerHtml += `<span id="pg${this.secretHash}${pgg}" class="ui pg-normal ${inverted}" onclick="call(this,'pressPage', '${pgg}')">${pgg}</span>&nbsp;`
      pagerHtml +=
        ' <span id="pgbuffer' +
        this.secretHash +
        `" class="ui pg-normal ${inverted}">...</span> &nbsp;`
    }
    let element = this.container.querySelector('.pageNavPosition')
    for (var page = startEle; page <= EndEle; page++)
      pagerHtml += `<span id="pg${this.secretHash}${page}" class="ui pg-normal ${inverted}" onclick="call(this,'pressPage', '${page}')">${page}</span>&nbsp;`

    if (EndEle === this.pages - 1) {
      let pgg = this.pages
      pagerHtml += `<span id="pg${this.secretHash}${pgg}" class="ui pg-normal ${inverted}" onclick="call(this,'pressPage', '${pgg}')">${pgg}</span>&nbsp;`
    }
    if (EndEle < this.pages - 1) {
      let pgg = this.pages
      pagerHtml += ` <span id="pgbuffer" class="ui pg-normal ${inverted}">...</span> &nbsp;`
      pagerHtml += `<span id="pg${this.secretHash}${pgg}" class="ui pg-normal ${inverted}" onclick="call(this,'pressPage', '${pgg}')">${pgg}</span>&nbsp;`
    }
    pagerHtml += `<span id="${pagerName}pgNext" class="ui pg-normal ${inverted}" onclick="call(this, 'next')"> Next &#187;</span>`
    element.innerHTML = pagerHtml
  }

  this.showPageNav = function (pagerName, positionId) {
    if (!this.inited) {
      alert('not inited')
      return
    }
    let element = this.container.querySelector('.' + positionId)
    let inverted = ''
    if (this.isInverted) {inverted='inverted'} 
    let pagerHtml = `<span id="${pagerName}pgPrev" class="ui pg-normal ${inverted}" onclick="call(this, 'prev')"> &#171 Prev</span>&nbsp;`

    let totPages
    totPages = this.pages
    if (this.pages > 3) {
      totPages = 3
    } else {
      totPages = this.pages
    }

    for (let page = 1; page <= totPages; page++) {
      pagerHtml += `<span id="pg${this.secretHash}${page}" class="ui pg-normal ${inverted}" onclick="call(this,'pressPage', '${page}')">${page}</span>&nbsp;`
    }

    if (this.pages === 4) {
      pagerHtml += `<span id="pg${
        this.secretHash
      }4" class="ui pg-normal ${inverted}" onclick="call(this,'pressPage', '${4}')">${4}</span>&nbsp;`
    }
    if (this.pages > 4) {
      pagerHtml += ` <span id="pgbuffer" class="ui pg-normal ${inverted}">...</span> &nbsp;`
      pagerHtml += `<span id="pg${this.pages}" class="ui pg-normal ${inverted}" onclick="call(this,'pressPage', '${this.pages}')">${this.pages}</span>&nbsp;`
    }
    pagerHtml += `<span id="${pagerName}pgNext" class="ui pg-normal ${inverted}" onclick="call(this, 'next')"> Next &#187;</span>`
    element.innerHTML = pagerHtml
  }
}

let tables = document.querySelectorAll('.ui.table-container')

for (let table of tables) {
  let mango = table.querySelector('.listDisplayPerPg')
  let reportsPerPage = mango.options[mango.selectedIndex].value
  let pager = new Pager('tadminViewReport', reportsPerPage, table)
  tableMap.set(table, pager)
  pager.init()
  pager.showPageNav('pager', 'pageNavPosition')
  pager.showPage(1)
}

function changeNumberOfPages (container) {
  let table = container.parentNode.parentNode.parentNode.parentNode
  let x = table.querySelector('.listDisplayPerPg')
  let pager = tableMap.get(table)
  pager.showPage(1)
  if(x.value === "all"){
    pager.num_pages = pager.container.querySelector('table').rows.length;
  }
  else{
    pager.num_pages = x.value
  }
  pager.init()
  pager.showPageNav('pager', 'pageNavPosition')
  pager.showPage(1)
}

function call (container, action, page) {
  let table = container.parentNode.parentNode.parentNode.parentNode
  let pager = tableMap.get(table)
  if (action === 'prev') {
    pager.prev()
  } else if (action === 'next') {
    pager.next()
  } else if (action === 'pressPage') {
    pager.pressPage(parseInt(page))
  }
}

function sortTable (container) {
  let table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0,
    n
  let parentContainer = container.parentNode.children
  for (i = 0; i < parentContainer.length; i++) {
    if (parentContainer[i] === container) {
      n = i
      break
    }
  }
  table = container.parentNode.parentNode
  switching = true
  dir = 'asc'
  while (switching) {
    switching = false
    rows = table.rows
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false
      x = rows[i].getElementsByTagName('TD')[n]
      y = rows[i + 1].getElementsByTagName('TD')[n]
      if (dir === 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      } else if (dir === 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
      switching = true
      switchcount++
    } else {
      if (switchcount === 0 && dir === 'asc') {
        dir = 'desc'
        switching = true
      }
    }
  }
  rows = table.rows[0]
  if (dir === 'asc') {
    for (let i = 0; i < rows.getElementsByTagName('TD').length; i++) {
      x = rows.getElementsByTagName('TD')[i].innerHTML
      rows.getElementsByTagName('TD')[i].innerHTML = x.slice(0, -1)
      if (i === n) {
        rows.getElementsByTagName('TD')[i].innerHTML += '&#9650;'
      } else {
        rows.getElementsByTagName('TD')[i].innerHTML += ' '
      }
    }
  }
  if (dir === 'desc') {
    for (let i = 0; i < rows.getElementsByTagName('TD').length; i++) {
      x = rows.getElementsByTagName('TD')[i].innerHTML
      rows.getElementsByTagName('TD')[i].innerHTML = x.slice(0, -1)
      if (i === n) {
        rows.getElementsByTagName('TD')[i].innerHTML += '&#9660;'
      } else {
        rows.getElementsByTagName('TD')[i].innerHTML += ' '
      }
    }
  }
}
