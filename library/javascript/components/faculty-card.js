let facultyCardIconMap = {
  address: "location",
  mail: "email",
  phone: "phone",
};

let facultyCards = document.querySelectorAll(".ui.faculty-card");

for (let card of facultyCards) {
  let phoneNode = info.querySelector(".phone");
  let phoneText = phoneNode.querySelector(".text");
  if (phoneText.innerHTML == "") phoneText.innerHTML = "--";
}
