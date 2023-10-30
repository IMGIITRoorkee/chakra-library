const html = document.getElementsByTagName('html')[0]
// let mq = window.matchMedia('(max-width: 1024px)')
// performHeaderChange(mq)

// mq.addEventListener('change', () => {
//   performHeaderChange(mq)
// })

document.getElementsByClassName("page-search")[0].firstElementChild.setAttribute("onClick", "open_search()")

// function performHeaderChange(mq) {

//   let is_main_header = true
//   var header_accessibility = document.querySelector('.upperleft')

//   // This deals with the two types of headers we have
//   if (header_accessibility === null) {
//     is_main_header = false
//     header_accessibility = document.querySelector('.ui.top-nav')
//   }

//   // if (mq.matches === true) {
//   //   header_accessibility.style.display = 'none'
//   // }
//   // else {
//   //   header_accessibility.style.display = is_main_header? 'block' : 'flex'

//   // }
// }

const small= document.querySelectorAll('.small')
small.forEach(element => {
  element.addEventListener('click', () => {
    console.log("size changed to small")
    html.style.fontSize = '14px'
  })
})

const medium = document.querySelectorAll('.medium')
medium.forEach(element => {
  element.addEventListener('click', () => {
    console.log("size changed to medium")
    html.style.fontSize = '16px'
  })
})

const big = document.querySelectorAll('.big')
big.forEach(element => {
  element.addEventListener('click', () => {
    console.log("size changed to big")
    html.style.fontSize = '18px'
  })
})

let lang_links = document.querySelectorAll('.language > .link')
if (lang_links.length == 0) {
  lang_links = document.querySelectorAll('.language > a')
}
hindi_link = lang_links[0]
eng_link = lang_links[1]

hindi_link.addEventListener('click', ()=>{
  const url = new URL(decodeURI(window.location.href));
  if(url.host === "iitr.ac.in"){
    let pathArr = url.pathname.split("/")
    if (pathArr.indexOf('Hindi') == -1) {
      pathArr.splice(1, 0, 'Hindi')
      let path = pathArr.join("/")
      if(path.charAt(path.length-1)=="/")
      path = path.substring(0,path.length-1)
      url.pathname = path
      window.location = url
    }
  }
})
eng_link.addEventListener('click', ()=>{
  const url = new URL(decodeURI(window.location.href));
  if(url.host === "iitr.ac.in"){
    let pathArr = url.pathname.split("/")
    let index = pathArr.indexOf('Hindi')
    if (index != -1) {
      pathArr.splice(index, 1)
      let path = pathArr.join("/")
      url.pathname = path
      window.location = url
    }
  }
})
