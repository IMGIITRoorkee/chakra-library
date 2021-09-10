var imagePath = "../../library/assets/images/description-card/right-arrow.svg";
var imagePathInverse =
  "../../library/assets/images/description-card/right-arrow-inverted.svg";

var descriptionCard = document.querySelectorAll(".ui.description-card");

var descriptionCardInverted = document.querySelectorAll(
  ".ui.description-card.inverted"
);

for (var i = 0; descriptionCard != -null && i < descriptionCard.length; i++) {
  var arrows = descriptionCard[i].getElementsByClassName("right arrow");
  for (var j = 0; arrows !== null && j < arrows.length; j++) {
    arrows[j].innerHTML = "";
    var arrow = document.createElement("img");
    arrow.setAttribute("src", imagePath);
    arrows[j].appendChild(arrow);
  }
}

for (
  var i = 0;
  descriptionCardInverted != -null && i < descriptionCardInverted.length;
  i++
) {
  var arrows = descriptionCardInverted[i].getElementsByClassName("right arrow");
  for (var j = 0; arrows !== null && j < arrows.length; j++) {
    arrows[j].innerHTML = "";
    var arrow = document.createElement("img");
    arrow.setAttribute("src", imagePathInverse);
    arrows[j].appendChild(arrow);
  }
}
