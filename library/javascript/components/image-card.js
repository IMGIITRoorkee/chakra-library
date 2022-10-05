let imageCardContentLinks = document.querySelectorAll('.ui.image-card .ui.image')
imageCardContentLinks.forEach(imageCard => {
    imageCard.addEventListener('click', (event) => {
        const content = imageCard.nextElementSibling;
        const button = content.querySelector('.ui.button');
        const link = button.getAttribute('href');
        window.open(link);
    });
});
