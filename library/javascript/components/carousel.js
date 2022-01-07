var slideIndex = 1
var carousel = document.querySelectorAll('.ui.carousel')
var slides = carousel[0].querySelectorAll('.ui.image')
var parentContainer = carousel[0].parentElement
// GOT TO REMOVE PADDING AND MARGIN FROM FULL WIDTH CONTAINER MANUALLY
// HERE! Don't change

parentContainer.className = ''

generateNavigator()
generateDots(slides.length)
showSlides(slideIndex)
generateNumber(slides.length)

// This function adds the navigator arrows to the carousel
function generateNavigator () {
  var carousel = document.querySelector('.ui.carousel')
  var flexbox = document.createElement('div')
  flexbox.classList.add('ui')
  flexbox.classList.add('flexbox')
  var prevArrow = document.createElement('a')
  prevArrow.classList.add('prev')
  prevArrow.onclick = function () {
    plusSlides(-1)
  }
  prevArrow.innerHTML = '&#10094;'
  flexbox.appendChild(prevArrow)
  var nextArrow = document.createElement('a')
  nextArrow.classList.add('next')
  nextArrow.onclick = function () {
    plusSlides(1)
  }
  nextArrow.innerHTML = '&#10095;'
  flexbox.appendChild(nextArrow)
  carousel.appendChild(flexbox)
}

function generateDots (count) {
  var carousel = document.querySelector('.ui.carousel')
  dotContainer = document.createElement('div')
  dotContainer.classList.add('dot-container')
  carousel.appendChild(dotContainer)
  for (var i = 1; i <= count; i++) {
    var ele = document.createElement('span')
    ele.classList.add('dot')
    dotContainer.append(ele)
  }
  var dots = document.querySelectorAll('.dot')
  dots.forEach((span, index) => {
    span.addEventListener('click', function () {
      currentSlide(index + 1)
    })
  })
}

function generateNumber (count) {
  var images = document.querySelectorAll('.carousel-image .image')
  for (var i = 1; i <= count; i++) {
    var ele = document.createElement('div')
    ele.classList.add('numbertext')
    ele.innerHTML = `${i}/${count}`
    images[i - 1].appendChild(ele)
  }
}

function plusSlides (n) {
  showSlides((slideIndex += n))
}

function currentSlide (n) {
  showSlides((slideIndex = n))
}

function showSlides (n) {
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
  slides[slideIndex - 1].style.display = 'contents'
  dots[slideIndex - 1].classList.add('active')
}
