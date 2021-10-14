let targetLink = document.querySelectorAll(".arrow-link");

for (let link of targetLink) {
    var key = link.getAttribute("data-target");
    link.onclick = changeLink;

    function changeLink() {
        window.location.href = key;
    }
}