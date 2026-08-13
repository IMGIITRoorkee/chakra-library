const html = document.getElementsByTagName('html')[0]

document.getElementsByClassName("page-search")[0].firstElementChild.setAttribute("onClick", "open_search()")

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
  } else {
    // Short-url subdomain (e.g. ece.iitr.ac.in): use meta tag injected at publish time
    const meta = document.querySelector('meta[name="hindi-url"]')
    if (meta && meta.content) {
      window.location.assign("https://iitr.ac.in" + meta.content)
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
