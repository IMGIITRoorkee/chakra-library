reportsPerPage = listDisplayPerPg.options[listDisplayPerPg.selectedIndex].value;

var pager = new Pager("tadminViewReport", reportsPerPage);
pager.init();
pager.showPageNav("pager", "pageNavPosition");
pager.showPage(1);

function changeNumberOfPages() {
  var x = document.getElementById("listDisplayPerPg");
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

  this.showRecords = function (from, to) {
    var rows = document.getElementById(tableName).rows;
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
    var newPageAnchor = document.getElementById("pg" + this.currentPage);
    newPageAnchor.className = "ui pg-selected";

    var from = (pageNumber - 1) * Number(this.num_pages) + 1;
    var to = from + Number(this.num_pages) - 1;
    this.showRecords(from, to);

    var pgNext = document.getElementById(this.pagerName + "pgNext");

    var pgPrev = document.getElementById(this.pagerName + "pgPrev");

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
    var rows = document.getElementById(tableName).rows;

    var records = rows.length - 1;
    this.pages = Math.ceil(records / this.num_pages);

    this.inited = true;
  };

  //it is used to  move the cursor upto 5 records.
  this.createPager = function (startEle, EndEle) {
    var pagerName = "pager";

    var pagerHtml =
      ' <span id="' +
      pagerName +
      'pgPrev" onclick="' +
      pagerName +
      '.prev();" class="ui pg-normal">   &#171 Prev  </span> &nbsp; ';
    if (startEle == 2) {
      var pgg = 1;
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
    if (startEle > 2) {
      var pgg = 1;
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
      pagerHtml +=
        ' <span id="pgbuffer" class="ui pg-normal">...</span> &nbsp;';
    }
    var element = document.getElementById("pageNavPosition");
    for (var page = startEle; page <= EndEle; page++)
      pagerHtml +=
        ' <span id="pg' +
        page +
        '" class="ui pg-normal" onclick="' +
        pagerName +
        ".pressPage(" +
        page +
        ');">' +
        page +
        " </span> &nbsp; ";
    if (EndEle == this.pages - 1) {
      var pgg = this.pages;
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
    if (EndEle < this.pages - 1) {
      var pgg = this.pages;
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

    var element = document.getElementById(positionId);
    var pagerHtml =
      ' <span id="' +
      pagerName +
      'pgPrev" onclick="' +
      pagerName +
      '.prev();" class="ui pg-normal"> &#171 Prev </span> &nbsp;  ';

    var totPages;
    totPages = this.pages;
    if (this.pages > 3) {
      totPages = 3;
    } else {
      totPages = this.pages;
    }
    for (var page = 1; page <= totPages; page++) {
      pagerHtml +=
        ' <span id="pg' +
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
