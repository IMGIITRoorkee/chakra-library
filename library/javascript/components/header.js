var html = document.getElementsByTagName('html')[0]
var small = document.querySelectorAll('.small')
small.forEach(element => {
  element.addEventListener('click', () => {
    console.log('Hi')
    html.style.fontSize = '14px'
  })
})

var medium = document.querySelectorAll('.medium')
medium.forEach(element => {
  element.addEventListener('click', () => {
    console.log('Hi')
    html.style.fontSize = '16px'
  })
})

var big = document.querySelectorAll('.big')
big.forEach(element => {
  element.addEventListener('click', () => {
    console.log('Hi')
    html.style.fontSize = '18px'
  })
})
