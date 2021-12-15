let arrowLinkTags = document.querySelectorAll(".ui.link.arrow-link")
let imagePath = "../../library/assets/icons/right-arrow.svg";
let imagePathInverse =
  "../../library/assets/icons/right-arrow-inverted.svg";

for(arrowLinkTag of arrowLinkTags){
    let image = document.createElement("img");

if (arrowLinkTag.className === "ui link arrow-link" ){

    image.setAttribute("src", imagePath);
}else if(arrowLinkTag.className === "ui link arrow-link inverted"){
    image.setAttribute("src", imagePathInverse)
}

arrowLinkTag.append(image)
}