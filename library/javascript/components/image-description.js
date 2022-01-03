var slideIndex = 1;
var slides = document.querySelectorAll(".carousel-image");
generateDots(slides.length);
showSlides(slideIndex);
generateNumber(slides.length);

function generateDots(count){
    var dotContainer = document.querySelector('.dot-container');
    for (var i=1; i<=count; i++){
        var ele = document.createElement('span');
        ele.classList.add('dot');
        dotContainer.append(ele);
    }
    var dots = document.querySelectorAll('.dot');
    dots.forEach((span,index) => {
        span.addEventListener('click', function(){
            currentSlide(index+1);
        })
    });
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
    
function showSlides(n) {
    var i;
    var dots = document.querySelectorAll(".dot");
    if (n > slides.length) {slideIndex = 1}    
    else if (n < 1) {slideIndex = slides.length}
    else slideIndex=n;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    slides[slideIndex-1].style.display = "flex";  
    slides[slideIndex-1].style.alignItems = "center";  
    slides[slideIndex-1].style.justifyContent = "center"; 
    slides[slideIndex-1].style.gap = "4rem"; 
    dots[slideIndex-1].classList.add("active");
}
