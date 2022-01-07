let special_node_list = document.querySelectorAll('div.menuSpecialNode');
let menu_container_list = document.querySelectorAll('.menuInnerContainer');
let node_sp_parent = document.querySelectorAll('nav.blue > ul');
let menu_parent_nodes = document.querySelectorAll('.menuParentNode > a');
let menu_parent_nodes_ul = document.querySelectorAll('.menuParentNode > .menuParentNodeUL');

console.log(special_node_list);

for (let i = 0; i < special_node_list.length; i++) {
    special_node_list[i].addEventListener('mouseover', () => {
        menu_container_list[i].classList.add('visible');
    })
    node_sp_parent[i].addEventListener('mouseleave', () => {
        menu_container_list[i].classList.remove('visible');
        menu_parent_nodes_ul.forEach(ele => {
            ele.classList.remove(('parentVisible'));
        })
    })
}
menu_parent_nodes.forEach((element, index) => {
    element.addEventListener('mouseover', () => {
        menu_parent_nodes_ul[index].classList.add('parentVisible');
    })
    element.addEventListener('mouseleave', () => {
        menu_parent_nodes_ul[index].classList.remove('parentVisible');
    })
    menu_parent_nodes_ul[index].addEventListener('mouseover', () => {
        menu_parent_nodes_ul[index].classList.add('parentVisible');
    });
    menu_parent_nodes_ul[index].addEventListener('mouseleave', () => {
        menu_parent_nodes_ul[index].classList.remove('parentVisible');
    });
});