let facultyCardIconMap = {
  address: "location",
  mail: "email",
  phone: "phone",
};

let facultyCards = document.querySelectorAll(".ui.faculty-card");

for (let card of facultyCards) {
  let flex = card.querySelector(".flex");
  let info = flex.querySelector(".info");

  for (let key of Object.keys(facultyCardIconMap)) {
    let keyNode = info.querySelector(`.${key}`);
    let imageContainer = keyNode.querySelector(".icon");
    let image = document.createElement("img");
    image.className='ui icon'
    image.setAttribute("data-icon", facultyCardIconMap[key]);
    imageContainer.append(image);
  }
  let phoneNode = info.querySelector(".phone");
  let phoneText = phoneNode.querySelector(".text");
  if (phoneText.innerHTML == "") phoneText.innerHTML = "--";
}
