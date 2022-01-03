import getIcon from './icon-library'

let arrowLinkTags = document.querySelectorAll('.ui.link.arrow-link')
let imagePath = getIcon('right_arrow')
let imagePathInverse = getIcon('right_arrow_inverted')
let imagePathBlue = getIcon('arrow')
for (arrowLinkTag of arrowLinkTags) {
  let image = document.createElement('img')

  if (arrowLinkTag.className === 'ui link arrow-link') {
    image.setAttribute('src', imagePath)
  } else if (arrowLinkTag.className === 'ui link arrow-link inverted') {
    image.setAttribute('src', imagePathInverse)
  } else if (arrowLinkTag.className === 'ui link arrow-link blue') {
    image.setAttribute('src', imagePathBlue)
  }

  arrowLinkTag.append(image)
}
