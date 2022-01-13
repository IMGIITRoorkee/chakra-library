var src = 'https://cmsredesign.channeli.in/'
const rightArrow = src + 'library/assets/icons/carouselright.svg'
const leftArrow = src + 'library/assets/icons/carouselleft.svg'

// Hash function
// Returns a hash of argument length
function makeHash (length) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// THIS FUNCTION REORDERS SLIDES by either inserting the last slide to first or
// first slide to last
const reorderSlides = (sliderHash, numCards, isLeft) => {
  const sliderElement = document.getElementById(sliderHash)
  const container = sliderElement.getElementsByClassName('container')[0]
  const cards = container.children

  const totalNumberOfCards = cards.length

  if (numCards < 1) {
    return
  }

  // Reorder
  if (isLeft) {
    // Put last card to the top
    if (totalNumberOfCards <= numCards) {return}
    if (totalNumberOfCards > numCards) {
      cards[numCards - 1].style.display = 'none'
    }
    const lastCard = cards[totalNumberOfCards - 1]
    if (lastCard.classList.contains('image-description-card')) {
      lastCard.style.display = 'flex'
    } else {
      lastCard.style.display = 'block'
    }
    container.insertBefore(lastCard, container.firstChild)
  } else {
    if (totalNumberOfCards <= numCards) {return}
    // Put first card to the bottom
    const firstChild = cards[0]
    if (totalNumberOfCards > numCards) {
      firstChild.style.display = 'none'
    }
    cards[numCards].style.display = 'block'
    if (cards[numCards].classList.contains('image-description-card')) {
      cards[numCards].style.display = 'flex'
    } else {
      cards[numCards].style.display = 'block'
    }
    container.appendChild(firstChild)
  }
}

const renderSlides = (hash, numberOfCards) => {
  const sliderElement = document.getElementById(hash)
  const container = sliderElement.getElementsByClassName('container')[0]
  const cards = container.children
  for (let i = 0; i < cards.length; ++i) {
    if (i < numberOfCards) {
      if (cards[i].classList.contains('image-description-card')) {
        cards[i].style.display = 'flex'
      } else {
        cards[i].style.display = 'block'
      }
    } else cards[i].style.display = 'none'
  }
}

// FUNCTION TO CALCULATE THE NUMBER OF CARDS

const numberOfCardsToDisplay = sliderHash => {
  const sliderElement = document.getElementById(sliderHash)

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )
  const px = Math.ceil((vw * 10) / 100)

  const container = sliderElement.getElementsByClassName('container')[0]
  const card = container.firstElementChild

  const numberOfCards = Math.floor(
    (sliderElement.clientWidth - px) / card.offsetWidth
  )
  const ret = numberOfCards > 1 ? numberOfCards : 1
  return ret
}

const sliderMap = {}

document.addEventListener('DOMContentLoaded', function (e) {
  const sliders = document.querySelectorAll('.ui.slider')
  for (let i = 0; i < sliders.length; ++i) {
    const hash = makeHash(10)
    sliders[i].id = hash
    sliderMap[hash] = 1

    const container = document.createElement('div')
    container.className = 'container'

    let card = sliders[i].firstChild

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

    leftArrowElement.addEventListener('click', function (e) {
      e.stopPropagation()
      e.preventDefault()

      if (e.target) {
        reorderSlides(hash, sliderMap[hash], true)
      }
    })

    rightArrowElement.addEventListener('click', function (e) {
      e.stopPropagation()
      e.preventDefault()

      if (e.target) {
        reorderSlides(hash, sliderMap[hash], false)
      }
    })

    renderSlides(hash, sliderMap[hash])
    sliderMap[hash] = numberOfCardsToDisplay(hash)
    renderSlides(hash, sliderMap[hash])
  }
})

window.onresize = () => {
  const sliders = document.querySelectorAll('.ui.slider')
  if (sliders === null) {
    return
  }
  for (let i = 0; i < sliders.length; i++) {
    const hash = sliders[i].id
    sliderMap[hash] = numberOfCardsToDisplay(hash)

    renderSlides(hash, sliderMap[hash])
  }
}
