let contact_card = document.querySelector(".ui.contact-card");

let flex = contact_card.querySelector(".contact-flex");

for (let key of Object.keys(paths)) {
  let keyNode = flex.querySelector(`.${key}`);
  if(keyNode!=null){
    let imageContainer = keyNode.querySelector(".icon");
    imageContainer.style.backgroundImage=`url(${paths[key]})`;
  }
  
}

let socialContainers = document.querySelectorAll(".social");
for (let socialContainer of socialContainers) {
  let links = socialContainer.querySelectorAll("a");
  for (let link of links) {
    if(link.hasAttribute("data-icon")) {
      let image_container = document.createElement("div");
      image_container.className = 'social-icon';
      let icon = link.getAttribute("data-icon");
      image_container.style.backgroundImage = `url(${paths[icon]})`;
      link.appendChild(image_container);
    }
  }
}
