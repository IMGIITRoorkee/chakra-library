let decCardContainers = document.querySelectorAll(
  '.ui.description-card-container'
)

function invertedDescCards (descCardContainer) {
  let cards = descCardContainer.getElementsByClassName('description-card')

  for (let i = 0; i < cards.length; ++i) {
    if (i % 2 === 0) {
      cards[i].className += ' inverted'
      let arrows = cards[i].getElementsByClassName('link')
      arrows[0].className += ' inverted'
      let heading = cards[i].getElementsByClassName('section-heading')
      heading[0].className += ' inverted'
      let description = cards[i].getElementsByClassName('description')
      description[0].className += ' inverted'
    }
  }
}

for (let cardContainer of decCardContainers) {
  invertedDescCards(cardContainer)
}
