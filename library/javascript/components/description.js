var descriptionParagraphs = document.querySelectorAll(".ui.description");

for (let para of descriptionParagraphs) {
  let align = para.getAttribute("alignment");
  para.style.textAlign = align;
}
