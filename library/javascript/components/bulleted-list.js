const bulletedLists = document.querySelectorAll('.ui.bulleted-list')

for (let i = 0; bulletedLists !== null && i < bulletedLists.length; i++) {
  let icon
  if (bulletedLists[i].hasAttribute('data-icon')) {
    icon = bulletedLists[i].getAttribute('data-icon')
  } else {
    bulletedLists[i].setAttribute('data-icon', 'blue_arrow')
    icon = 'blue_arrow'
  }
  let bulletedItems = bulletedLists[i].getElementsByClassName('listItem')
  for (let j = 0; bulletedItems !== null && j < bulletedItems.length; j++) {
    const image = document.createElement('img')
    image.setAttribute('data-icon', icon)
    image.className = 'ui icon'
    image.classList.add('icon_image')
    bulletedItems[j].prepend(image)
  }
}
