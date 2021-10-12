let buttonLinks = document.querySelectorAll(".button.link");

for (let link of buttonLinks) {
    var key = link.getAttribute("data-target");
    link.onclick = changeLink;

    function changeLink() {
        window.location.href = key;
    }
}

let textLinks = document.querySelectorAll(".text.link");

for (let link of textLinks) {
    var key = link.getAttribute("data-target");
    link.onclick = changeLink;

    function changeLink() {
        window.location.href = key;
    }
}