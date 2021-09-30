let imagePath = "../../library/assets/images/description-card/right-arrow.svg";
let imagePathInverse =
  "../../library/assets/images/description-card/right-arrow-inverted.svg";

let descriptionCard = document.querySelectorAll(".ui.description-card");

let descriptionCardInverted = document.querySelectorAll(
  ".ui.description-card.inverted"
);

for (let i = 0; descriptionCard !== null && i < descriptionCard.length; i++) {
  let arrows = descriptionCard[i].getElementsByClassName("right arrow");
  for (let j = 0; arrows !== null && j < arrows.length; j++) {
    arrows[j].innerHTML = "";
    let arrow = document.createElement("img");
    arrow.setAttribute("src", imagePath);
    arrows[j].appendChild(arrow);
  }
}

for (
  let i = 0;
  descriptionCardInverted !== null && i < descriptionCardInverted.length;
  i++
) {
  let arrows = descriptionCardInverted[i].getElementsByClassName("right arrow");
  for (let j = 0; arrows !== null && j < arrows.length; j++) {
    arrows[j].innerHTML = "";
    let arrow = document.createElement("img");
    arrow.setAttribute("src", imagePathInverse);
    arrows[j].appendChild(arrow);
  }
}
