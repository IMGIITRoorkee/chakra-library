let imageConatiner = document.querySelectorAll(".ui.quote-card .picture");

let default_faculty = "../../library/assets/icons/default_faculty.png";

for(let quote of imageConatiner){
    let path=quote.getAttribute("src");
    print(path)
    if(path==""){
        path=default_faculty;
    }
    let circle = document.createElement("div");
    circle.style.width="111px";
    circle.style.height="111px";
    circle.style.borderRadius="50%";
    circle.style.backgroundRepeat="no-repeat";
    circle.style.backgroundPosition="center";
    circle.style.backgroundImage=`url(${path})`;
    quote.appendChild(circle);
}
