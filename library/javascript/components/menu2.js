var mq = window.matchMedia('(max-width: 1024px)')
performChange(mq)
mq.onchange = mq => {
    performChange(mq)
}
function performChange(mq) {
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

    if (mq.matches === false) {
        for (let i = 0; i < special_node_list.length; i++) {
            if (i === special_node_list.length - 1 || i === special_node_list.length - 2) {
                menu_containers_list[i].childNodes.forEach((ele, ind) => {
                    if (ele.tagName === "DIV") {
                        if (ele.classList.contains("menuParentNode")) {
                            ele.childNodes[3].style.left = "-101%";
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
                if (element.classList[1] === 'menuParentNode') {


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
        let navBar = document.querySelector('.menuContainer div.flexbox')
        let open = false
        navBar.style.display = 'none'
        let active_sp_index = null
        let anchors = document.querySelectorAll('a');
        anchors.forEach(el => {
            if (el.hasChildNodes() && el.firstElementChild !== null) {
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
                console.log("should be opened!!")
                navBar.style.display = ''
                navBar.classList.add('navbarVisible')
            } else {
                navBar.style.display = 'none'
                navBar.classList.remove('navbarVisible')
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
                if (element.classList[1] === 'menuParentNode') {
                    element.childNodes[1].childNodes[1].childNodes[3].classList.toggle('activeParentNode')
                    element.childNodes[3].classList.toggle('parentVisible')
                    element.classList.toggle('activeParentNode')
                }
            })
        })
    }
}
