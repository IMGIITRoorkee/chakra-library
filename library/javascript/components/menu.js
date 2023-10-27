let mq = window.matchMedia('(max-width: 1024px)')

let special_node_list = document.querySelectorAll('.menuContainer div.flexbox>.menuItem>a')
let menu_containers_list = document.querySelectorAll('div.flexbox>.menuItem>ul')
let menu_container_items = document.querySelectorAll('div.flexbox>.menuItem>ul div')
let menu_parent_nodes_ul = document.querySelectorAll(
    'div.flexbox>.menuItem>ul div>ul'
)
menu_parent_nodes_ul.forEach(element => {
    element.parentElement.classList.add("menuParentNode")
});
let nav = document.querySelector('.menuContainer div.flexbox')
let active_parent_node = null
let active_sp_index = null
let controller = new AbortController()
performChange(mq)

let menuNodes = document.querySelectorAll('.ui.flexbox>.menuItem')
menuNodes.forEach(node => {
    let textLink = node.querySelector('.ui.intro-text');
    if (textLink && textLink.textContent.includes('More')) {
      node.classList.add("more");
    }
  });

function handleSpClick(element, index) {
    if (active_sp_index !== null) {
        const prev_sp_element = special_node_list[active_sp_index]
        if(prev_sp_element.nextElementSibling){
            prev_sp_element.nextElementSibling.classList.remove('visible')
        }
        prev_sp_element.classList.remove(
            'activeParentNode'
        )
    }
    active_sp_index = index
    if(element.nextElementSibling){
        element.nextElementSibling.classList.add('visible')
    }
    element.classList.add('activeParentNode')
    menu_parent_nodes_ul.forEach(ele => {
        ele.classList.remove('parentVisible')
    })
    menu_container_items.forEach(ele => {
        ele.classList.remove('activeParentNode')
    })
}


function menuContainerCallBack(element, index) {
    if (active_parent_node !== null) {
        active_parent_node.childNodes[3].classList.remove('parentVisible')
        active_parent_node.classList.remove('activeParentNode')
        active_parent_node.childNodes[1].childNodes[1].childNodes[3].classList.remove(
            'activeParentNode'
        )
    }
    if (element.classList.contains("menuParentNode")) {
        element.childNodes[1].childNodes[1].childNodes[3].classList.add('activeParentNode')
        active_parent_node = element
        element.childNodes[3].classList.add('parentVisible')
        element.classList.add('activeParentNode')
    } else {
        active_parent_node = null
    }
}
function navCallBack() {
    flushClasses()
}

function clickCallBack(element, index) {
    if (element.classList[1] === 'menuParentNode') {
        element.childNodes[1].childNodes[1].childNodes[3].classList.toggle('activeParentNode')
        element.childNodes[3].classList.toggle('parentVisible')
        element.classList.toggle('activeParentNode')
    }
}


function flushEvents() {
    // TODO: A better way to flush events
}

function flushClasses() {
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
}

function performChange(mq) {
    flushClasses()
    flushEvents()
    if (mq.matches === false) {
        nav.style.display = ''
        controller = new AbortController()
        special_node_list.forEach((element, index) => {
            if (index === special_node_list.length - 1 || index === special_node_list.length - 2) {
                if(menu_containers_list[index]){
                    menu_containers_list[index].childNodes.forEach((ele) => {
                        if (ele.tagName === "DIV" && ele.classList.contains("menuParentNode")) {
                            ele.childNodes[3].style.left = "-101%";
                        }
                    })
                }
            }
            element.addEventListener('mouseover', handleSpClick.bind(null, element, index), { signal: controller.signal })
        })

        menu_container_items.forEach((element, index) => {
            element.addEventListener('mouseover', menuContainerCallBack.bind(null, element, index), { signal: controller.signal })
        })

        nav.addEventListener('mouseleave', navCallBack, { signal: controller.signal })
    } else {

        flushClasses();
        controller.abort()
        nav.style.display = 'none'

        let hamburger = document.getElementById('hamBurger')
        let open = false

        let anchors = document.querySelectorAll('a');
        anchors.forEach(el => {
            if (el.hasChildNodes() && el.firstElementChild && el.firstElementChild.firstElementChild !== null) {
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
            nav.style.display = ''
            if (open === false) {
                open = true
                nav.classList.add('navbarVisible')
            } else {
                nav.classList.remove('navbarVisible')
                open = false
            }
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
        special_node_list.forEach((element, index) => {
            element.addEventListener('click', handleSpClick.bind(null, element, index))
        })
        menu_container_items.forEach((element, index) => {
            element.addEventListener('click', clickCallBack.bind(null, element, index))
        })
    }
}

mq.addEventListener('change', () => {
    performChange(mq)
})