let paths = {
  address: "../../library/assets/icons/location.png",
  mail: "../../library/assets/icons/mail.png",
  phone: "../../library/assets/icons/phone.png",
};

let facultyCards = document.querySelectorAll(".ui.faculty-card");

for (let card of facultyCards) {
  let flex = card.querySelector(".flex");
  let info = flex.querySelector(".info");

  for (let key of Object.keys(paths)) {
    let keyNode = info.querySelector(`.${key}`);
    let imageContainer = keyNode.querySelector(".icon");
    let image = document.createElement("img");
    image.setAttribute("src", paths[key]);
    imageContainer.append(image);
  }
  let phoneNode = info.querySelector(".phone");
  let phoneText = phoneNode.querySelector(".text");
  if (phoneText.innerHTML == "") phoneText.innerHTML = "--";
}
