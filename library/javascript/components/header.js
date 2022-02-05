const html = document.getElementsByTagName('html')[0]
const small = document.querySelectorAll('.small')

performHeaderChange(mq)

mq.addEventListener('change', () => {
  performHeaderChange(mq)
})

function performHeaderChange(mq) {

  var header_accessibility = document.querySelector('.upperleft')

  if (mq.matches === true) {
    header_accessibility.style.display = 'none'
  }
  else {
    header_accessibility.style.display = 'block'

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
