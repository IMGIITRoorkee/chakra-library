let arrowLinkTags = document.querySelectorAll('.ui.link.arrow-link')
let imagePath = '../../library/assets/icons/right-arrow.svg'
let imagePathInverse = '../../library/assets/icons/right-arrow-inverted.svg'
let imagePathBlue = '../../library/assets/icons/arrow-icon.svg'
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
