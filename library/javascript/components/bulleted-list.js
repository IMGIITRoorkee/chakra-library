const bulletedLists = document.querySelectorAll('.ui.bulleted-list')

for (let i=0; (bulletedLists !== null) && (i < bulletedLists.length); i++){
    let icon;
    if (bulletedLists[i].hasAttribute("data-icon")){
        icon = bulletedLists[i].getAttribute("data-icon");
    } else {
        if (bulletedLists[i].classList.contains('inverted')){
            icon = "arrow_dark";
        } else {
            icon = "arrow";
        }
    }
    let bulletedItems = bulletedLists[i].getElementsByClassName('listItem');
    for (let j=0; (bulletedItems !== null) && (j < bulletedItems.length); j++) {
        const image = document.createElement("img");
        image.setAttribute("src", "https://cmsredesign.channeli.in/"+paths[icon]);
        image.classList.add("icon_image");
        bulletedItems[j].prepend(image);
    }
}
