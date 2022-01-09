var mq = window.matchMedia("(max-width: 1024px)");
let special_node_list = document.querySelectorAll('div.menuSpecialNode');
let menu_containers_list = document.querySelectorAll('.menuInnerContainer');
let menu_container_items = document.querySelectorAll('.menuInnerContainer li');
let menu_parent_nodes_ul = document.querySelectorAll('.menuParentNode > .menuParentNodeUL');

let nav = document.querySelector('nav');

if (mq.matches === false) {
    for (let i = 0; i < special_node_list.length; i++) {
        special_node_list[i].addEventListener('mouseover', () => {
            if (active_sp_index !== null) {
                menu_containers_list[active_sp_index].classList.remove('visible');
            }
            active_sp_index = i;
            menu_containers_list[i].classList.add('visible');
            menu_parent_nodes_ul.forEach(ele => {
                ele.classList.remove(('parentVisible'));
            })
        })
    }
    let active_parent_node = null;
    let active_sp_index = null;

    menu_container_items.forEach((element, index) => {
        element.addEventListener('mouseover', () => {
            console.log(element);
            if (active_parent_node !== null) {
                active_parent_node.childNodes[3].classList.remove('parentVisible');
                active_parent_node.classList.remove('activeParentNode');
                active_parent_node.childNodes[1].childNodes[3].classList.remove('activeParentNode');

            }
            if (element.classList[0] === 'menuParentNode') {
                element.childNodes[1].childNodes[3].classList.add('activeParentNode');
                active_parent_node = element;
                element.childNodes[3].classList.add('parentVisible');
                element.classList.add('activeParentNode');
            } else {
                active_parent_node = null;
            }
        })
    })

    nav.addEventListener('mouseleave', () => {
        menu_containers_list.forEach(ele => {
            ele.classList.remove('visible');
        })
        menu_parent_nodes_ul.forEach(ele => {
            ele.classList.remove('parentVisible');
        })
        menu_container_items.forEach(ele => {
            ele.classList.remove('activeParentNode');
        })
    })
} else {
    let hamburger = document.getElementById('hamBurger');
    let navBar = document.querySelector('nav.blue');
    let open = false;

    let active_parent_node = null;
    let active_sp_index = null;

    hamburger.addEventListener('click', (e) => {
        if (open === false) {
            open = true;
            navBar.classList.add('navbarVisible');
        } else {
            navBar.classList.remove('navbarVisible');
            open = false;
        }
    });
    special_node_list.forEach((element, index) => {

        // TODO: Need To Listen to click event, but there are hrefs on a which change the location.

        element.addEventListener('mouseover', () => {
            if (active_sp_index !== null) {
                menu_containers_list[active_sp_index].classList.remove('visible');
                special_node_list[active_sp_index].classList.remove('activeParentNode');

            }
            active_sp_index = index;
            menu_containers_list[index].classList.add('visible');
            element.classList.add('activeParentNode');
            menu_parent_nodes_ul.forEach(ele => {
                ele.classList.remove(('parentVisible'));
            })
        })
    })
    menu_container_items.forEach((element, index) => {
        element.addEventListener('mouseover', () => {
            console.log(element);
            if (active_parent_node !== null) {
                active_parent_node.childNodes[3].classList.remove('parentVisible');
                active_parent_node.classList.remove('activeParentNode');
                active_parent_node.childNodes[1].childNodes[3].classList.remove('activeParentNode');

            }
            console.log(element);
            if (element.classList[0] === 'menuParentNode') {
                element.childNodes[1].childNodes[3].classList.add('activeParentNode');
                active_parent_node = element;
                element.childNodes[3].classList.add('parentVisible');
                element.classList.add('activeParentNode');
            } else {
                active_parent_node = null;
            }
        })
        element.addEventListener('mouseleave', () => {
            if (element.classList[0] === 'menuParentNode') {
                element.childNodes[1].childNodes[3].classList.remove('activeParentNode');
                element.childNodes[3].classList.remove('parentVisible');
                element.classList.remove('activeParentNode');
            }
        })
    })

    nav.addEventListener('mouseleave', () => {
        menu_containers_list.forEach(ele => {
            ele.classList.remove('visible');
        })
        menu_parent_nodes_ul.forEach(ele => {
            ele.classList.remove('parentVisible');
        })
        menu_container_items.forEach(ele => {
            ele.classList.remove('activeParentNode');
        })
        special_node_list.forEach((ele => {
            ele.classList.remove('activeParentNode');
        }))
    })
}