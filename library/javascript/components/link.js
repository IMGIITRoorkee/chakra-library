let link = document.querySelectorAll(".ui.link");
for (var i = 0; (link !== null) && (i < link.length); i++) {
  const items = link[i].getElementsByClassName('button')
  for (var j = 0; (items !== null) && (j < items.length); j++) {
    items[j].onclick = changeLink;
    
    function changeLink() {
      window.location.href = 'https://google.com';
    }
  }
}