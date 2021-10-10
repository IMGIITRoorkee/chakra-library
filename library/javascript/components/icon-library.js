let paths = {
    search: "../../test/assets/icons/search-icon.svg",
    dropdown: "../../test/assets/icons/dropdown-icon.svg",
    carouselright: "../../test/assets/icons/carouselright-icon.svg",
    carouselleft: "../../test/assets/icons/carouselleft-icon.svg",
    arrow: "../../test/assets/icons/arrow-icon.svg",
    hospital: "../../test/assets/icons/hospital-icon.svg",
    heart: "../../test/assets/icons/heart-icon.svg",
    phone: "../../test/assets/icons/phone-icon.svg",
    email: "../../test/assets/icons/email-icon.svg",
    contact: "../../test/assets/icons/contact-icon.svg",
    compass: "../../test/assets/icons/compass-icon.svg",
    download: "../../test/assets/icons/download-icon.svg",
    microphone: "../../test/assets/icons/microphone-icon.svg",
    sort: "s../../test/assets/icons/ort-icon.svg",
    wellness: "../../test/assets/icons/wellness-icon.svg",
    share: "../../test/assets/icons/share-icon.svg",
    homepage_hygiene: "../../test/assets/icons/homepage_hygiene-icon.svg",
    arrow_dark: "../../test/assets/icons/arrow_dark-icon.svg",
    bullet_point_dark: "../../test/assets/icons/bullet_point_dark-icon.svg",
    departments_dark: "../../test/assets/icons/departments_dark-icon.svg",
    stats_students_dark: "../../test/assets/icons/stats_students_dark-icon.svg",
    stats_faculty_dark: "../../test/assets/icons/stats_faculty_dark-icon.svg",
    centres_dark: "../../test/assets/icons/centres_dark-icon.svg",
    contact_dark: "../../test/assets/icons/contact_dark-icon.svg",
    filter_list_dark: "../../test/assets/icons/filter_list_dark-icon.svg",
    schools_dark: "../../test/assets/icons/schools_dark-icon.svg",
    stats_staff_dark: "../../test/assets/icons/stats_staff_dark-icon.svg",
    stats_patents_dark: "../../test/assets/icons/stats_patents_dark-icon.svg",
    for_students: "../../test/assets/icons/for_students-icon.svg",
    for_students_hover: "../../test/assets/icons/for_students_hover-icon.svg",
    for_faculty: "../../test/assets/icons/for_faculty-icon.svg",
    for_faculty_hover: "../../test/assets/icons/for_faculty_hover-icon.svg",
    for_visitors: "../../test/assets/icons/for_visitors-icon.svg",
    for_visitors_hover: "../../test/assets/icons/for_visitors_hover-icon.svg",
    floating_button: "../../test/assets/icons/floating_button-icon.svg",
    floating_button_hover: "../../test/assets/icons/floating_button_hover-icon.svg",
    committee: "../../test/assets/icons/committee-icon.svg",
    google_icon_1: "../../test/assets/icons/google_icon_1-icon.svg"
};

let documentIcons = document.querySelectorAll(".ui.icon");

for (let icon of documentIcons) {
    let image = document.createElement("img");
    var key = icon.getAttribute("data-icon");
    image.setAttribute("src", paths[key]);
    image.className = "icon_image"
    document.getElementById('icons').appendChild(image);
}