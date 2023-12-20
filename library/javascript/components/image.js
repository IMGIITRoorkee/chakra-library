var imageComponent = document.querySelectorAll('.ui.image')
imageComponent.forEach((element) => {
    let image = element.querySelector('img[contentlink]')
    let imageLink = image.getAttribute('contentlink')
    if (imageLink != '') {
        image.addEventListener('click', (e) => {
            window.open(imageLink)
        });
    }
});
