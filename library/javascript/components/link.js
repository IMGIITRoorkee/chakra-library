let arrowLinkTags = document.querySelectorAll('.ui.link.arrow-link')
for (arrowLinkTag of arrowLinkTags) {
  let image = document.createElement('img')
  image.className = 'ui icon'
  if (arrowLinkTag.className === 'ui link arrow-link') {
    image.setAttribute('data-icon', 'right_arrow')
  } else if (arrowLinkTag.className === 'ui link arrow-link inverted') {
    image.setAttribute('data-icon', 'right_arrow_dark')
  } else if (arrowLinkTag.className === 'ui link arrow-link blue') {
    image.setAttribute('data-icon', 'blue_arrow')
  }

  arrowLinkTag.append(image)
}
