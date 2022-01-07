var src = 'https://cmsredesign.channeli.in/'
var rightArrow = src + 'library/assets/icons/slider-right-arrow.svg'
var leftArrow = src + 'library/assets/icons/slider-left-arrow.svg'

// Hash function
function makeHash (length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const flushSlides = sliderHash => {
  const slidesElement = document.getElementById(sliderHash)
  const container = slidesElement.getElementsByClassName('container')[0]
  const cards = container.children

  for (var i = 0; cards !== null && i < cards.length; i++)
    [(cards[i].style.display = 'none')]
}

const reorderSlides = (sliderHash, numberOfCardsRendered, isLeft) => {
  const slidesElement = document.getElementById(sliderHash)
  const container = slidesElement.getElementsByClassName('container')[0]
  const cards = container.children

  const numberOfCards = cards.length

  if (numberOfCardsRendered < 1) {
    return
  }

  // Reorder
  if (isLeft) {
    // Put last card to the top
    const lastCard = cards[numberOfCards - 1]
    container.insertBefore(lastCard, container.firstChild)
  } else {
    // Put first card to the bottom
    const firstChild = cards[0]
    container.appendChild(firstChild)
  }
}

const renderSlides = (sliderHash, numberOfCardsRendered) => {
  const slidesElement = document.getElementById(sliderHash)
  const container = slidesElement.getElementsByClassName('container')[0]
  const cards = container.children

  const numberOfCards = cards.length

  for (var i = 0; i < numberOfCards && i < numberOfCardsRendered; i++) {
    cards[i].style.display = 'block'
  }
}

const numberOfCardsDisplayed = sliderHash => {
  const slidesElement = document.getElementById(sliderHash)

  const container = slidesElement.getElementsByClassName('container')[0]
  const card = container.firstElementChild

  var numberOfCards = Math.floor(slidesElement.clientWidth / card.clientWidth)
  return numberOfCards > 1 ? numberOfCards - 1 : 1
}

window.onresize = () => {
  const sliders = document.querySelectorAll('.ui.slider')

  for (var i = 0; sliders !== null && i < sliders.length; i++) {
    const hash = sliders[i].id
    numberOfCardsRendered = numberOfCardsDisplayed(hash)
    flushSlides(hash)
    renderSlides(hash, numberOfCardsRendered)
  }
}

// Assign a unique hash to the sliders
var sliders = document.querySelectorAll('.ui.slider')
for (var i = 0; sliders !== null && i < sliders.length; i++) {
  var numberOfCardsRendered = 1 // Default

  const hash = makeHash(20)
  sliders[i].id = hash

  const container = document.createElement('div')
  container.className = 'container'

  var card = sliders[i].firstChild

  while (card) {
    container.appendChild(card)
    card = sliders[i].firstChild
  }

  const leftArrowContainer = document.createElement('div')
  leftArrowContainer.className = 'left-arrow-container'

  const leftArrowElement = document.createElement('img')
  leftArrowElement.className = 'arrow'
  leftArrowElement.setAttribute('src', leftArrow)
  leftArrowContainer.appendChild(leftArrowElement)

  const rightArrowContainer = document.createElement('div')
  rightArrowContainer.className = 'right-arrow-container'

  const rightArrowElement = document.createElement('img')
  rightArrowElement.className = 'arrow'
  rightArrowElement.setAttribute('src', rightArrow)
  rightArrowContainer.appendChild(rightArrowElement)

  sliders[i].appendChild(leftArrowContainer)
  sliders[i].appendChild(container)
  sliders[i].appendChild(rightArrowContainer)

  numberOfCardsRendered = numberOfCardsDisplayed(hash)
  flushSlides(hash)
  renderSlides(hash, numberOfCardsRendered)

  leftArrowElement.addEventListener('click', function (e) {
    e.stopPropagation()
    e.preventDefault()

    if (e.target) {
      // Flush Slides
      // Reorder slides
      // Render the top `m` slides

      flushSlides(hash)
      reorderSlides(hash, numberOfCardsRendered, true)
      renderSlides(hash, numberOfCardsRendered)
    }
  })

  rightArrowElement.addEventListener('click', function (e) {
    e.stopPropagation()
    e.preventDefault()

    if (e.target) {
      // Flush Slides
      // Reorder slides
      // Render the top `m` slides

      flushSlides(hash)
      reorderSlides(hash, numberOfCardsRendered, false)
      renderSlides(hash, numberOfCardsRendered)
    }
  })
}

for (var i = 0; sliders !== null && i < sliders.length; i++) {
  const hash = sliders[i].id
  numberOfCardsRendered = numberOfCardsDisplayed(hash)
  flushSlides(hash)
  renderSlides(hash, numberOfCardsRendered)
}
