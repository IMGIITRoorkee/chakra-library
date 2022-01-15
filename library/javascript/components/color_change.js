const whitelist = [
  // This is blacklist actually
  'description-card',
  'faculty-card',
  'floating-button',
  'iframe',
  'image-accordion',
  'image-card',
  'image',
  'list-bluebg',
  'profile-placeholder',
  'quote-card',
  'image-card',
  'mini-image-card',
]

// JS reload testing comment

const toInvertClasses = [
  'intro-text',
  'sub-heading',
  'section-heading',
  'one-liner-captions',
  'description',
  'link',
  'divider',
  'title',
  'number',
  'numbered-list',
  'button',
  'link',
  // 'table-head',
  // 'table-value',
  'table',
  'pg-normal',
  'tabs-container',
  'date'
]

function contrast_light() {
  let body=document.getElementsByTagName('body')[0]
  body.className='light'
  loadIcons()
}

function contrast_dark() {
  let body=document.getElementsByTagName('body')[0]
  body.className='dark'
  loadIcons()
}

function flipIcon (iconElement) {
  if (iconElement.hasAttribute('data-icon') === false) {
    return
  }
  let icon = iconElement.getAttribute('data-icon')

  if (icon.includes('dark')) return
  icon = icon + '_dark'

  iconElement.setAttribute('data-icon', icon)
}

function addClassToTree (element) {
  let isWhiteListed = false

  element.classList.forEach((value, key) => {
    if (whitelist.includes(value)) {
      isWhiteListed = true
    }
  })

  if (isWhiteListed) {
    return
  }

  if (element.classList.contains('icon')) {
    flipIcon(element)
  }

  element.classList.forEach((value, key) => {
    if (toInvertClasses.includes(value)) {
      element.classList.add('inverted')
    }
  })

  for (let i = 0; i < element.children.length; ++i) {
    addClassToTree(element.children[i])
  }
}

const fullWidthContainers = document.getElementsByClassName('gradient-blue')

for (let i = 0; i < fullWidthContainers.length; ++i) {
  const container = fullWidthContainers[i]

  for (let i = 0; i < container.children.length; ++i) {
    addClassToTree(container.children[i])
  }
}
