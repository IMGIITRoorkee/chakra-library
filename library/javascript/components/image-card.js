let imageCardContentLinks = document.querySelectorAll(
  '.ui.image-card .ui.image'
)
imageCardContentLinks.forEach(imageCardImage => {
  let content = imageCardImage.nextElementSibling
  let description = content.querySelector('.ui.intro-text')
  let imageCard = imageCardImage.parentElement
  if (description.innerHTML.trim() == '') {
    imageCard.style.height = '27rem'
    let prevImageCard = imageCard.previousElementSibling
    let nextImageCard = imageCard.nextElementSibling
    let prevImageCardDesc = ''
    let nextImageCardDesc = ''
    if (prevImageCard != null) {
      prevImageCardDesc = prevImageCard
        .querySelector('.ui.intro-text')
        .innerHTML.trim()
    }
    if (nextImageCard != null) {
      nextImageCardDesc = nextImageCard
        .querySelector('.ui.intro-text')
        .innerHTML.trim()
    }
    if (prevImageCardDesc != '' || nextImageCardDesc != '') {
      console.log('hi')
      let prevImageCardHeight = 0
      let nextImageCardHeight = 0
      if (prevImageCard)
        prevImageCardHeight = Number(prevImageCard.offsetHeight)
      if (nextImageCard)
        nextImageCardHeight = Number(nextImageCard.offsetHeight)
      imageCard.style.height =
        Math.max(prevImageCardHeight, nextImageCardHeight).toString() + 'px'
    }
  }
  imageCardImage.addEventListener('click', event => {
    const content = imageCardImage.nextElementSibling
    const button = content.querySelector('.ui.button')
    const link = button.getAttribute('href')
    window.open(link)
  })
})
