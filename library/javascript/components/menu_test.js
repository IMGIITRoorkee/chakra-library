let special_node_list = document.querySelectorAll('div.menuSpecialNode');
let menu_containers_list = document.querySelectorAll('.menuInnerContainer');
let menu_container_items = document.querySelectorAll('.menuInnerContainer li');
let node_sp_parent = document.querySelectorAll('nav.blue > ul');
let menu_parent_nodes = document.querySelectorAll('.menuParentNode > a');
let menu_parent_nodes_ul = document.querySelectorAll('.menuParentNode > .menuParentNodeUL');
let nav = document.querySelector('nav');

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