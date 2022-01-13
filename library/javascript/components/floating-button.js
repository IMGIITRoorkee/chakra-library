function hover (element) {
  element.setAttribute('src', 'https://cmsredesign.channeli.in/' + paths.floating_button_hover)
}

function unhover (element) {
  element.setAttribute('src', 'https://cmsredesign.channeli.in/' + paths.floating_button)
}

function goToTop () {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

window.onscroll = function () {
  showScroll()
}

var scrollBtn = document.querySelector('.ui.floating-btn .ui.icon')
scrollBtn.setAttribute("onclick", 'goToTop()')

function showScroll () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollBtn.style.display = 'block'
  } else {
    scrollBtn.style.display = 'none'
  }
}
