const bulletedLists = document.querySelectorAll('.ui.bulleted-list')

for (let i = 0; bulletedLists !== null && i < bulletedLists.length; i++) {
  //   let Ficon
  //   if (bulletedLists[i].hasAttribute('data-icon')) {
  //     icon = bulletedLists[i].getAttribute('data-icon')
  //   } else {
  // if (bulletedLists[i].classList.contains('inverted')){
  //     icon = "arrow_dark";
  // } else {
  bulletedLists[i].setAttribute('data-icon', 'blue_arrow')
  // icon = 'arrow'
  // }
  //   }F
  // let bulletedItems = bulletedLists[i].getElementsByClassName('listItem');
  // for (let j=0; (bulletedItems !== null) && (j < bulletedItems.length); j++) {
  //     const image = document.createElement("img");
  //     image.setAttribute("src", "../../"+paths[icon]);
  //     image.classList.add("icon_image");
  //     bulletedItems[j].prepend(image);
  // }
}
