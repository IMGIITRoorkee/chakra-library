var mq = window.matchMedia('(max-width: 1024px)')

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

const controller = new AbortController()
performChange(mq)
mq.onchange = mq => {
    performChange(mq)
    performHeaderChange(mq)
}
function handleSpClick(element, index) {
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
    if (mq.matches === false) {
        nav.style.display = ''
        special_node_list.forEach((element, index) => {
            if (index === special_node_list.length - 1 || index === special_node_list.length - 2) {
                menu_containers_list[index].childNodes.forEach((ele) => {
                    if (ele.tagName === "DIV" && ele.classList.contains("menuParentNode")) {
                        ele.childNodes[3].style.left = "-101%";
                    }
                })
            }
            element.addEventListener('mouseover', () => { handleSpClick(element, index) }, { signal: controller.signal })
        })


        menu_container_items.forEach((element, index) => {
            element.addEventListener('mouseover', () => {
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
            }, { signal: controller.signal })
        })

        nav.addEventListener('mouseleave', () => {
            flushClasses()
        }, { signal: controller.signal })
    } else {
        controller.abort()
        nav.style.display = 'none'
        flushClasses();

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

            element.addEventListener('click', () => {
                handleSpClick(element, index);
            })
        })
        menu_container_items.forEach((element, index) => {

            element.addEventListener('click', () => {
                if (element.classList[1] === 'menuParentNode') {
                    element.childNodes[1].childNodes[1].childNodes[3].classList.toggle('activeParentNode')
                    element.childNodes[3].classList.toggle('parentVisible')
                    element.classList.toggle('activeParentNode')
                }
            })
        })
    }
}
