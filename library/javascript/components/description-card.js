let descriptionCardInverted = document.querySelectorAll(
  ".ui.description-card.inverted"
);

for (let card of descriptionCardInverted) {
  let arrows = card.getElementsByClassName("link");
  arrows[0].className += " inverted";
}
