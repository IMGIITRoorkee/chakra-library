let special_node_list = document.querySelectorAll('div.menuSpecialNode');
let menu_container_list = document.querySelectorAll('.menuInnerContainer');
let node_sp_parent = document.querySelectorAll('nav.blue > ul');
let menu_parent_nodes = document.querySelectorAll('.menuParentNode > a');
let menu_parent_nodes_ul = document.querySelectorAll('.menuParentNode > .menuParentNodeUL');
let nav = document.querySelector('nav');

for (let i = 0; i < special_node_list.length; i++) {
    special_node_list[i].addEventListener('mouseover', () => {
        if (active_sp_index !== null) {
            menu_container_list[active_sp_index].classList.remove('visible');
        }
        active_sp_index = i;
        menu_container_list[i].classList.add('visible');
        menu_parent_nodes_ul.forEach(ele => {
            ele.classList.remove(('parentVisible'));
        })
    })
}
let active_parent_node = null;
let active_parent_index = null;
let active_sp_index = null;

menu_parent_nodes.forEach((element, index) => {
    element.addEventListener('mouseover', () => {
        if (active_parent_node !== null) {
            menu_parent_nodes_ul[active_parent_index].classList.remove('parentVisible');
            active_parent_node.classList.remove('boldParentNode');
        }
        active_parent_node = element;
        active_parent_index = index;
        menu_parent_nodes_ul[index].classList.add('parentVisible');
        active_parent_node.classList.add('boldParentNode');
    })
});


nav.addEventListener('mouseleave', () => {
    menu_container_list.forEach(ele => {
        ele.classList.remove('visible');
    })
    menu_parent_nodes_ul.forEach(ele => {
        ele.classList.remove('parentVisible');
    })
    menu_parent_nodes.forEach(ele => {
        ele.classList.remove('boldParentNode');
    })
})