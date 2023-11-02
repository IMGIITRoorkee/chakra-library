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

const small = document.querySelectorAll('.small')
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

let lang_links = document.querySelectorAll('.language > .link')
if (lang_links.length == 0) {
  lang_links = document.querySelectorAll('.language > a')
  console.log(lang_links.length)
}
hindi_link = lang_links[0]
eng_link = lang_links[1]


function hindi_navigate() {
  if (window.location.host === "iitr.ac.in" || window.location.host === "www.iitr.ac.in") {
    let pathArr = window.location.pathname.split("/")
    if (pathArr.indexOf('Hindi') == -1) {
      pathArr.splice(1, 0, 'Hindi')
      let path = pathArr.join("/")
      if (path.charAt(path.length - 1) == "/")
        path = path.substring(0, path.length - 1)
      window.location.assign("https://" + window.location.host + path);
    }
  }
}

function eng_navigate() {
  if (window.location.host === "iitr.ac.in" || window.location.host === "www.iitr.ac.in") {
    let pathArr = window.location.pathname.split("/")
    let index = pathArr.indexOf('Hindi')
    if (index != -1) {
      pathArr.splice(index, 1)
      let path = pathArr.join("/")
      window.location.assign("https://" + window.location.host + path)
    }
  }
}

hindi_link.addEventListener('click', hindi_navigate)
eng_link.addEventListener('click', eng_navigate)

if(lang_links.length===4){
  hindi_menu_link=lang_links[2]
  eng_menu_link=lang_links[3]
  hindi_menu_link.addEventListener('click', hindi_navigate)
  eng_menu_link.addEventListener('click', eng_navigate)
}
