let paths = {
  mail: "../../library/assets/icons/mail_contact.png",
  phone: "../../library/assets/icons/phone_contact.png",
};

let contact_card = document.querySelector(".ui.contact-card");

let flex = contact_card.querySelector(".flex");

for (let key of Object.keys(paths)) {
  let keyNode = flex.querySelector(`.${key}`);
  let imageContainer = keyNode.querySelector(".icon");
  let circle = document.createElement("div");
  circle.style.width="26px";
  circle.style.height="26px";
  circle.style.borderRadius="50%";
  circle.style.backgroundColor="#CFDBE6";
  circle.style.backgroundRepeat="no-repeat";
  circle.style.backgroundPosition="center";
  circle.style.backgroundImage=`url(${paths[key]})`;
  imageContainer.append(circle);
}

let social = new Map();

social.set("Facebook", {
  link: "https://www.facebook.com/",
  addr: "../../library/assets/icons/fb.png",
});
social.set("Facebook1", {
  link: "https://www.facebook.com/",
  addr: "../../library/assets/icons/fb.png",
});
social.set("Facebook2", {
  link: "https://www.facebook.com/",
  addr: "../../library/assets/icons/fb.png",
});
social.set("Facebook3", {
  link: "https://www.facebook.com/",
  addr: "../../library/assets/icons/fb.png",
});
social.set("Facebook4", {
    link: "https://www.facebook.com/",
    addr: "../../library/assets/icons/fb.png",
  });

let socialContainer = document.querySelector(".social");

for (let [key, value] of social) {
  let link = document.createElement("a");
  link.setAttribute("href", value.link);
  let icon = document.createElement("img");
  icon.setAttribute("src", value.addr);
  icon.style.width = "25px";
  icon.style.height = "25px";
  icon.style.borderRadius = "50%";
  socialContainer.append(link);
  link.append(icon);
}
