let imageConatiner = document.querySelectorAll(".ui.quote-card .picture")[0];

let default_faculty = "../../library/assets/icons/default_faculty.png";

let path=imageConatiner.getAttribute("src");

if(path==""){
    path=default_faculty;
}

let circle = imageConatiner.querySelector(".photo")
circle.style.backgroundImage=`url(${path})`;
