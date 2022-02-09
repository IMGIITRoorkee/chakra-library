const html = document.getElementsByTagName('html')[0]
const small = document.querySelectorAll('.small')

performHeaderChange(mq)

mq.addEventListener('change', () => {
  performHeaderChange(mq)
})

function performHeaderChange(mq) {

  let is_main_header = true
  var header_accessibility = document.querySelector('.upperleft')

  // This deals with the two types of headers we have
  if (header_accessibility === null) {
    is_main_header = false
    header_accessibility = document.querySelector('.ui.top-nav')
  }

  if (mq.matches === true) {
    header_accessibility.style.display = 'none'
  }
  else {
    header_accessibility.style.display = is_main_header? 'block' : 'flex'

  }
}

small.forEach(element => {
  element.addEventListener('click', () => {
    html.style.fontSize = '14px'
  })
})

const medium = document.querySelectorAll('.medium')
medium.forEach(element => {
  element.addEventListener('click', () => {
    html.style.fontSize = '16px'
  })
})

const big = document.querySelectorAll('.big')
big.forEach(element => {
  element.addEventListener('click', () => {
    html.style.fontSize = '18px'
  })
})
