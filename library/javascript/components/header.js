var html = document.getElementsByTagName('html')[0]
var small = document.querySelectorAll('.small')
performHeaderChange(mq)

mq.onchange = mq => {
  performHeaderChange(mq)

}

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

var medium = document.querySelectorAll('.medium')
medium.forEach(element => {
  element.addEventListener('click', () => {
    html.style.fontSize = '16px'
  })
})

var big = document.querySelectorAll('.big')
big.forEach(element => {
  element.addEventListener('click', () => {
    html.style.fontSize = '18px'
  })
})
