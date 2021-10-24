let paths = {
  mail: "../../library/assets/icons/mail_contact.svg",
  phone: "../../library/assets/icons/phone_contact.svg",
};

let contact_card = document.querySelector(".ui.contact-card");

let flex = contact_card.querySelector(".contact-flex");

for (let key of Object.keys(paths)) {
  let keyNode = flex.querySelector(`.${key}`);
  let imageContainer = keyNode.querySelector(".icon");
  imageContainer.style.backgroundImage=`url(${paths[key]})`;
}

let social = new Map();

social.set("Facebook", {
  link: "https://www.facebook.com/",
  addr: "../../library/assets/icons/fb_logo_cms.svg",
  bgcolor: "#3b5998",
});
social.set("Youtube", {
  link: "https://www.facebook.com/",
  addr: "../../library/assets/icons/youtube_logo.svg",
  bgcolor: "#bb0000",
});
social.set("Instagram", {
  link: "https://www.facebook.com/",
  addr: "../../library/assets/icons/insta_logo_cms.svg",
  bgcolor: "#FE1F49",
});
social.set("Linkedin", {
  link: "https://www.facebook.com/",
  addr: "../../library/assets/icons/linkedin_logo.svg",
  bgcolor: "#007bb6",
});
social.set("Twitter", {
  link: "https://www.facebook.com/",
  addr: "../../library/assets/icons/twitter_logo.svg",
  bgcolor: "#00aced",
});
social.set("Website", {
    link: "https://www.facebook.com/",
    addr: "../../library/assets/icons/web_logo.svg",
    bgcolor: "#181818",
  });

let socialContainer = document.querySelector(".social");


for (let [key, value] of social) {
  let link = document.createElement("a");
  link.setAttribute("href", value.link);
  let icon = document.createElement("div")
  icon.style.width = "26px";
  icon.style.height = "26px";
  icon.style.borderRadius = "50%";
  icon.style.backgroundColor = "#CFDBE6";
  icon.style.backgroundRepeat="no-repeat";
  icon.style.backgroundPosition="center";
  icon.style.backgroundImage=`url(${value.addr})`;
  icon.addEventListener("mouseover", function(event){
    event.target.style.backgroundColor = value.bgcolor;
  })
  icon.addEventListener("mouseout", function(event){
    event.target.style.backgroundColor = "#CFDBE6";
  })
  socialContainer.append(link);
  link.append(icon);
}
