reportsPerPage = listDisplayPerPg.options[listDisplayPerPg.selectedIndex].value;

let pager = new Pager("tadminViewReport", reportsPerPage);
pager.init();
pager.showPageNav("pager", "pageNavPosition");
pager.showPage(1);

//Picked from tabs.js
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function changeNumberOfPages() {
  let x = document.getElementById("listDisplayPerPg");
  pager.showPage(1);
  pager.num_pages = x.value;
  pager.init();
  pager.showPageNav("pager", "pageNavPosition");
  pager.showPage(1);
}

function Pager(tableName, itemsPerPage) {
  this.tableName = tableName;
  this.currentPage = 1;
  this.pages = 0;
  this.inited = false;
  this.num_pages = itemsPerPage;
  this.secretHash = makeid(24) + "-" + makeid(6);

  this.showRecords = function (from, to) {
    let rows = document.getElementById(tableName).rows;
    for (var i = 1; i < rows.length; i++) {
      if (i < from || i > to) rows[i].style.display = "none";
      else rows[i].style.display = "";
    }
  };

  this.showPage = function (pageNumber) {
    if (!this.inited) {
      alert("not inited");
      return;
    }

    this.currentPage = pageNumber;
    let newPageAnchor = document.getElementById(
      "pg" + this.secretHash + this.currentPage
    );
    newPageAnchor.className = "ui pg-selected";

    let from = (pageNumber - 1) * Number(this.num_pages) + 1;
    let to = from + Number(this.num_pages) - 1;

    this.showRecords(from, to);

    let pgNext = document.getElementById(this.pagerName + "pgNext");

    let pgPrev = document.getElementById(this.pagerName + "pgPrev");

    if (pgNext != null) {
      if (this.currentPage == this.pages) pgNext.style.display = "none";
      else pgNext.style.display = "";
    }
    if (pgPrev != null) {
      if (this.currentPage == 1) pgPrev.style.display = "none";
      else pgPrev.style.display = "";
    }
  };
  this.pressPage = function (pageNumber) {
    this.createPager(
      Math.max(pageNumber - 1, 1),
      Math.min(pageNumber + 1, this.pages)
    );

    this.showPage(pageNumber);
  };
  this.prev = function () {
    if (this.currentPage > 1) {
      this.createPager(Math.max(this.currentPage - 2, 1), this.currentPage); // it  used to move the cursor to privious index.

      this.showPage(this.currentPage - 1);
    }
  };

  this.next = function () {
    if (this.currentPage < this.pages) {
      this.createPager(
        this.currentPage,
        Math.min(this.pages, this.currentPage + 2)
      );

      this.showPage(this.currentPage + 1);
    }
  };

  this.init = function () {
    let rows = document.getElementById(tableName).rows;

    let records = rows.length - 1;
    this.pages = Math.ceil(records / this.num_pages);

    this.inited = true;
  };

  this.createPager = function (startEle, EndEle) {
    let pagerName = "pager";
    let pagerHtml =
      ' <span id="' +
      pagerName +
      'pgPrev" onclick="' +
      pagerName +
      '.prev();" class="ui pg-normal">   &#171 Prev  </span> &nbsp; ';

    if (startEle == 2) {
      let pgg = 1;
      pagerHtml +=
        ' <span id="pg' +
        this.secretHash +
        pgg +
        '" class="ui pg-normal" onclick="' +
        pagerName +
        ".pressPage(" +
        pgg +
        ');">' +
        pgg +
        " </span> &nbsp; ";
    }

    if (startEle > 2) {
      let pgg = 1;
      pagerHtml +=
        ' <span id="pg' +
        this.secretHash +
        pgg +
        '" class="ui pg-normal" onclick="' +
        pagerName +
        ".pressPage(" +
        pgg +
        ');">' +
        pgg +
        " </span> &nbsp; ";
      pagerHtml +=
        ' <span id="pgbuffer' +
        this.secretHash +
        '" class="ui pg-normal">...</span> &nbsp;';
    }

    let element = document.getElementById("pageNavPosition");
    for (var page = startEle; page <= EndEle; page++)
      pagerHtml +=
        ' <span id="pg' +
        this.secretHash +
        page +
        '" class="ui pg-normal" onclick="' +
        pagerName +
        ".pressPage(" +
        page +
        ');">' +
        page +
        " </span> &nbsp; ";

    if (EndEle == this.pages - 1) {
      let pgg = this.pages;
      pagerHtml +=
        ' <span id="pg' +
        this.secretHash +
        pgg +
        '" class="ui pg-normal" onclick="' +
        pagerName +
        ".pressPage(" +
        pgg +
        ');">' +
        pgg +
        " </span> &nbsp; ";
    }
    if (EndEle < this.pages - 1) {
      let pgg = this.pages;
      pagerHtml +=
        ' <span id="pgbuffer" class="ui pg-normal">...</span> &nbsp;';
      pagerHtml +=
        ' <span id="pg' +
        pgg +
        '" class="ui pg-normal" onclick="' +
        pagerName +
        ".pressPage(" +
        pgg +
        ');">' +
        pgg +
        " </span> &nbsp; ";
    }

    pagerHtml +=
      ' <span id="' +
      pagerName +
      'pgNext" onclick="' +
      pagerName +
      '.next();" class="ui pg-normal"> Next &#187;</span> ';

    element.innerHTML = pagerHtml;
  };

  this.showPageNav = function (pagerName, positionId) {
    if (!this.inited) {
      alert("not inited");
      return;
    }

    let element = document.getElementById(positionId);
    let pagerHtml =
      ' <span id="' +
      pagerName +
      'pgPrev" onclick="' +
      pagerName +
      '.prev();" class="ui pg-normal"> &#171 Prev </span> &nbsp;  ';

    let totPages;
    totPages = this.pages;
    if (this.pages > 3) {
      totPages = 3;
    } else {
      totPages = this.pages;
    }

    for (let page = 1; page <= totPages; page++) {
      pagerHtml +=
        ' <span id="pg' +
        this.secretHash +
        page +
        '" class="ui pg-normal" onclick="' +
        pagerName +
        ".pressPage(" +
        page +
        ');">' +
        page +
        "  </span> &nbsp;";
    }

    if (this.pages == 4) {
      pagerHtml +=
        ' <span id="pg' +
        this.secretHash +
        4 +
        '" class="ui pg-normal" onclick="' +
        pagerName +
        ".pressPage(" +
        4 +
        ');">' +
        4 +
        "  </span> &nbsp;";
    }
    if (this.pages > 4) {
      pagerHtml +=
        ' <span id="pgbuffer" class="ui pg-normal">...</span> &nbsp;';
      pagerHtml +=
        ' <span id="pg' +
        this.pages +
        '" class="ui pg-normal" onclick="' +
        pagerName +
        ".pressPage(" +
        this.pages +
        ');">' +
        this.pages +
        "  </span> &nbsp;";
    }

    pagerHtml +=
      ' <span id="   ' +
      pagerName +
      'pgNext" onclick="' +
      pagerName +
      '.next();" class="ui pg-normal"> Next &#187;</span> ';

    element.innerHTML = pagerHtml;
  };
}
