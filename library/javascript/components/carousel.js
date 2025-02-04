function activateCarousel(carousel) {
  var slideIndex = 1
  var slides = carousel.querySelectorAll('.ui.image, .ui.video')
  var parentContainer = carousel.parentElement
  // GOT TO REMOVE PADDING AND MARGIN FROM FULL WIDTH CONTAINER MANUALLY
  // HERE! Don't change

  if(parentContainer.className.split(" ").indexOf("full-width-container") != -1)
  {
    parentContainer.className = ''
  }

  if(parentContainer.className.split(" ").indexOf("carousel-stats") != -1)
  {
    parentContainer.parentElement.className = ''
  }

  generateNavigator()
  generateDots(slides.length)
  showSlides(slideIndex)
  generateNumber(slides)

  // This function adds the navigator arrows to the carousel
  function generateNavigator() {
    var flexbox = document.createElement('div')
    flexbox.classList.add('ui')
    flexbox.classList.add('flexbox')
    var prevArrow = document.createElement('img')
    prevArrow.setAttribute('data-icon', 'carouselleft')
    prevArrow.className = 'ui icon'
    prevArrow.classList.add('prev')
    prevArrow.onclick = function () {
      plusSlides(-1)
    }
    // prevArrow.innerHTML = '&#10094;'
    flexbox.appendChild(prevArrow)
    var nextArrow = document.createElement('img')
    nextArrow.className = 'ui icon'
    nextArrow.setAttribute('data-icon', 'carouselright')
    nextArrow.classList.add('next')
    nextArrow.onclick = function () {
      plusSlides(1)
    }
    // nextArrow.innerHTML = '&#10095;'
    flexbox.appendChild(nextArrow)
    carousel.appendChild(flexbox)
  }

  function generateDots(count) {
    dotContainer = document.createElement('div')
    dotContainer.classList.add('dot-container')
    carousel.appendChild(dotContainer)
    for (var i = 1; i <= count; i++) {
      var ele = document.createElement('span')
      ele.classList.add('dot')
      dotContainer.append(ele)
      var bgDiv = document.createElement('div')
      bgDiv.classList.add('bg-image')
      bgDiv.style.backgroundImage = slides[i - 1].classList.contains('image') ? 'url(' + slides[i - 1].querySelector('img').src + ')' : 'url(' + slides[i - 1].src + ')'
      slides[i - 1].appendChild(bgDiv)
    }
    var dots = document.querySelectorAll('.dot')
    dots.forEach((span, index) => {
      span.addEventListener('click', function () {
        currentSlide(index + 1)
      })
    })
  }

  function generateNumber(slides) {
    for (var i = 0; i < slides.length; i++) {
      var ele = document.createElement('div')
      ele.classList.add('numbertext')
      ele.innerHTML = `${i + 1}/${slides.length}`
      slides[i].appendChild(ele)
    }
  }

  function plusSlides(n) {
    showSlides((slideIndex += n))
  }

  function currentSlide(n) {
    showSlides((slideIndex = n))
  }

  function showSlides(n) {
    var i
    var dots = document.querySelectorAll('.dot')
    if (n > slides.length) {
      slideIndex = 1
    } else if (n < 1) {
      slideIndex = slides.length
    } else slideIndex = n
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none'
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active')
    }
    displayStyle = slides[slideIndex - 1].classList.contains('video') ? 'block' : 'contents'
    slides[slideIndex - 1].style.display = displayStyle
    dots[slideIndex - 1].classList.add('active')
  }

  setInterval(() => {
    slides[slideIndex - 1].classList.contains('video') ? plusSlides(0) : plusSlides(1)
  }, 4000)

}
var titleBars = document.querySelectorAll('.ui.carousel > .ui.title-bar');

titleBars.forEach(titleBar => {
  if (titleBar) {
    let words = titleBar.textContent
      .trim() // Remove extra spaces
      .split(" "); // Split words by space

    console.log("Original Text:", titleBar.textContent); // Log original text
    console.log("Split Words:", words); // Log the array of words

    titleBar.innerHTML = words
      .map(word => `<div>${word}</div>`) // Wrap each word in a <div>
      .join("");

    console.log("Modified HTML:", titleBar.innerHTML); // Log modified content
  }
});

var carousels = document.querySelectorAll('.ui.carousel')
carousels.forEach(carousel => activateCarousel(carousel))
var fluidImageContainers = document.querySelectorAll('.ui.image.fluid')
fluidImageContainers.forEach((element) => {
  let fluidImage = element.querySelector('img[contentlink]')
  let fluidImageLink = fluidImage.getAttribute('contentlink')
  if (fluidImageLink != '') {
    fluidImage.addEventListener('click', (e) => {
      window.open(fluidImageLink)
    });
  }
});