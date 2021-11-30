const profileImages = document.querySelectorAll(".ui.quote-card .picture");
const default_icon = "../../library/assets/icons/default_faculty.png";

for(let i=0; (profileImages !== null) && (i < profileImages.length); i++){
    let imageSrc = profileImages[i].getAttribute("src");
    if (imageSrc=="" || imageSrc==null){
        imageSrc = default_icon;
    }
    profileImages[i].style.backgroundImage=`url(${imageSrc})`;
}

