var mq = window.matchMedia('(max-width: 1024px)')
performChange(mq)
mq.onchange = mq => {
  performChange(mq)
}
function performChange(mq) {
  let special_node_list = document.querySelectorAll('.menuContainer nav ul>a')
  let menu_containers_list = document.querySelectorAll('.menuInnerContainer')
  let menu_container_items = document.querySelectorAll('.menuInnerContainer li')
  let menu_parent_nodes_ul = document.querySelectorAll(
    '.menuContainer nav li>ul'
  )

  let nav = document.querySelector('nav')

  if (mq.matches === false) {
    for (let i = 0; i < special_node_list.length; i++) {

      if (i === special_node_list.length - 1 || i === special_node_list.length - 2) {
        menu_containers_list[i].childNodes[1].childNodes.forEach((ele, ind) => {
          if (ele.tagName === "LI") {
            if (ele.classList.value === "menuParentNode") {
              ele.childNodes[3].style.left = "-102%";
            }
          }
        })
      }
      special_node_list[i].addEventListener('mouseover', () => {
        if (active_sp_index !== null) {
          menu_containers_list[active_sp_index].classList.remove('visible')
        }
        active_sp_index = i
        menu_containers_list[i].classList.add('visible')

        menu_parent_nodes_ul.forEach(ele => {
          ele.classList.remove('parentVisible')
        })
      })
    }
    let active_parent_node = null
    let active_sp_index = null

    menu_container_items.forEach((element, index) => {
      element.addEventListener('mouseover', () => {
        if (active_parent_node !== null) {
          active_parent_node.childNodes[3].classList.remove('parentVisible')
          active_parent_node.classList.remove('activeParentNode')
          active_parent_node.childNodes[1].childNodes[1].childNodes[3].classList.remove(
            'activeParentNode'
          )
        }
        if (element.classList[0] === 'menuParentNode') {


          element.childNodes[1].childNodes[1].childNodes[3].classList.add('activeParentNode')
          active_parent_node = element
          element.childNodes[3].classList.add('parentVisible')
          element.classList.add('activeParentNode')
        } else {
          active_parent_node = null
        }
      })
    })

    nav.addEventListener('mouseleave', () => {
      menu_containers_list.forEach(ele => {
        ele.classList.remove('visible')
      })
      menu_parent_nodes_ul.forEach(ele => {
        ele.classList.remove('parentVisible')
      })
      menu_container_items.forEach(ele => {
        ele.classList.remove('activeParentNode')
      })
    })
  } else {
    let hamburger = document.getElementById('hamBurger')
    let navBar = document.querySelector('nav.blue')
    let open = false
    navBar.style.display = 'none'
    let active_sp_index = null
    let anchors = document.querySelectorAll('a');
    anchors.forEach(el => {
      if (el.hasChildNodes() && el.firstChild.nodeName == "DIV") {
        let clicked = false;
        el.onclick = function (e) {
          if (!clicked) {
            clicked = true;
            clearTimeout(id);
            var id = setTimeout(function () { clicked = false }, 500);
            e.preventDefault();
          }

        }
      }
    })
    hamburger.addEventListener('click', e => {
      if (open === false) {
        open = true
        navBar.style.display = ''
        navBar.classList.add('navbarVisible')
      } else {
        navBar.style.display = 'none'
        navBar.classList.remove('navbarVisible')
        open = false
      }
    })
    special_node_list.forEach((element, index) => {

      element.addEventListener('click', () => {
        if (active_sp_index !== null) {
          menu_containers_list[active_sp_index].classList.remove('visible')
          special_node_list[active_sp_index].classList.remove(
            'activeParentNode'
          )
        }
        active_sp_index = index
        menu_containers_list[index].classList.add('visible')
        element.classList.add('activeParentNode')
        menu_parent_nodes_ul.forEach(ele => {
          ele.classList.remove('parentVisible')
        })
        menu_container_items.forEach(ele => {
          ele.classList.remove('activeParentNode')
        })
      })
    })
    menu_container_items.forEach((element, index) => {

      element.addEventListener('click', () => {
        if (element.classList[0] === 'menuParentNode') {
          element.childNodes[1].childNodes[1].childNodes[3].classList.toggle('activeParentNode')
          element.childNodes[3].classList.toggle('parentVisible')
          element.classList.toggle('activeParentNode')
        }
      })
    })

    nav.addEventListener('mouseleave', () => {
      menu_containers_list.forEach(ele => {
        ele.classList.remove('visible')
      })
      menu_parent_nodes_ul.forEach(ele => {
        ele.classList.remove('parentVisible')
      })
      menu_container_items.forEach(ele => {
        ele.classList.remove('activeParentNode')
      })
      special_node_list.forEach(ele => {
        ele.classList.remove('activeParentNode')
      })
    })
  }
}
