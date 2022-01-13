var src = 'https://cmsredesign.channeli.in/'
// const src = '../../'
var downArrow = src + 'library/assets/icons/dropdown.svg'
var upArrow = src + 'library/assets/icons/up-arrow.svg'
var downArrowDark = src + 'library/assets/icons/dropdown-dark.svg'
var upArrowDark = src + 'library/assets/icons/up-arrow-dark.svg'

var accordions = document.querySelectorAll('.ui.accordion')
for (var i = 0; accordions !== null && i < accordions.length; i++) {
  var items = accordions[i].getElementsByClassName('item')
  for (var k = 0; items !== null && k < items.length; k++) {
    // Add dividers
    const divider = document.createElement('div')
    divider.className = 'divider'
    items[k].parentNode.insertBefore(divider, items[k].nextSibling)

    var titles = items[k].getElementsByClassName('ui sub-heading')
    if (titles !== null) {
      var title = titles[0]

      // Add Arrow
      const arrow = document.createElement('img')
      arrow.setAttribute('data-icon', 'dropdown')
      arrow.className = 'ui icon'
      title.appendChild(arrow)

      for (let j = 1; j < items[k].childElementCount; ++j) {
        items[k].children[j].style.display = 'none'
      }
      // Manage click
      title.addEventListener('click', function (e) {
        e.stopPropagation()
        e.preventDefault()

        if (e.target) {
          if (e.target === arrow) {
            const description = e.target.parentNode.nextElementSibling

            if (description !== null) {
              if (description.style.display === 'block') {
                description.style.display = 'none'
                if (arrow.getAttribute('data-icon') === 'up_arrow_dark') {
                  arrow.setAttribute('src', downArrowDark)
                  arrow.setAttribute('data-icon', 'dropdown_dark')
                } else if (arrow.getAttribute('data-icon') === 'up_arrow') {
                  arrow.setAttribute('src', downArrow)
                  arrow.setAttribute('data-icon', 'dropdown')
                } else if (
                  arrow.getAttribute('data-icon') === 'dropdown_dark'
                ) {
                  arrow.setAttribute('src', upArrowDark)
                  arrow.setAttribute('data-icon', 'up_arrow_dark')
                } else {
                  arrow.setAttribute('src', upArrow)
                  arrow.setAttribute('data-icon', 'up_arrow')
                }
              } else {
                description.style.display = 'block'

                if (arrow.getAttribute('data-icon') === 'up_arrow_dark') {
                  arrow.setAttribute('src', downArrowDark)
                  arrow.setAttribute('data-icon', 'dropdown_dark')
                } else if (arrow.getAttribute('data-icon') === 'up_arrow') {
                  arrow.setAttribute('src', downArrow)
                  arrow.setAttribute('data-icon', 'dropdown')
                } else if (
                  arrow.getAttribute('data-icon') === 'dropdown_dark'
                ) {
                  arrow.setAttribute('src', upArrowDark)
                  arrow.setAttribute('data-icon', 'up_arrow_dark')
                } else {
                  arrow.setAttribute('src', upArrow)
                  arrow.setAttribute('data-icon', 'up_arrow')
                }
              }
            }
          } else {
            const description = e.target.nextElementSibling
            const arrow = e.target.childNodes[1]

            if (description !== null) {
              if (description.style.display === 'block') {
                description.style.display = 'none'

                console.log('Arrow 3', arrow, arrow.getAttribute('data-icon'))
                if (arrow.getAttribute('data-icon') === 'up_arrow_dark') {
                  arrow.setAttribute('src', downArrowDark)
                } else {
                  arrow.setAttribute('src', downArrow)
                }
              } else {
                description.style.display = 'block'

                console.log('Arrow 4', arrow, arrow.getAttribute('data-icon'))
                if (arrow.getAttribute('data-icon') === 'dropdown_dark') {
                  arrow.setAttribute('src', upArrowDark)
                } else {
                  arrow.setAttribute('src', upArrow)
                }
              }
            }
          }
        }
      })
    }
  }
}

var imageAccordions = document.querySelectorAll('.ui.image-accordion')
for (var i = 0; imageAccordions !== null && i < imageAccordions.length; i++) {
  const items = imageAccordions[i].getElementsByClassName('item')
  for (var j = 0; items !== null && j < items.length; j++) {
    const contents = items[j].getElementsByClassName('content')
    if (contents !== null) {
      const content = contents[0]

      const titles = content.getElementsByClassName('ui sub-heading')
      if (titles !== null) {
        const title = titles[0]

        // Add Arrow
        const arrow = document.createElement('img')
        arrow.setAttribute('src', downArrow)
        arrow.className = 'arrow'
        title.appendChild(arrow)

        // Add divider
        const divider = document.createElement('div')
        divider.className = 'divider'
        title.parentNode.insertBefore(divider, title.nextSibling)

        for (let k = 1; k < content.childElementCount; ++k) {
          content.children[k].style.display = 'none'
        }

        // Manage click
        title.addEventListener('click', function (e) {
          e.stopPropagation()
          e.preventDefault()

          if (e.target) {
            if (e.target === arrow) {
              const divider = e.target.parentNode.nextElementSibling
              const description = divider.nextElementSibling

              if (description !== null) {
                if (description.style.display === 'block') {
                  divider.style.display = 'none'
                  description.style.display = 'none'
                  arrow.setAttribute('src', downArrow)
                } else {
                  divider.style.display = 'block'
                  description.style.display = 'block'
                  arrow.setAttribute('src', upArrow)
                }
              }
            } else {
              const divider = e.target.nextElementSibling
              const description = divider.nextElementSibling
              const arrow = e.target.childNodes[1]

              if (description !== null) {
                if (description.style.display === 'block') {
                  divider.style.display = 'none'
                  description.style.display = 'none'
                  arrow.setAttribute('src', downArrow)
                } else {
                  divider.style.display = 'block'
                  description.style.display = 'block'
                  arrow.setAttribute('src', upArrow)
                }
              }
            }
          }
        })
      }
    }
  }
}
