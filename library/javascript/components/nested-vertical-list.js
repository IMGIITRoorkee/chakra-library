const url = window.location.href.split('#')[0]

const vertical_list_nest = document.getElementsByClassName('one-liner-captions')

const list_sub_heading = document.getElementsByClassName('list-sub-heading')

for(let i=0; i<vertical_list_nest.length; i++){
    var id = vertical_list_nest[i].innerHTML.toLowerCase()
    vertical_list_nest[i].setAttribute('id', id.replace(/\s/g,'') + 'd')
}

for(let i=0; i<list_sub_heading.length; i++){
    var id = list_sub_heading[i].innerHTML.toLowerCase()
    list_sub_heading[i].setAttribute('id', id.replace(/\s/g,''))
}

function head_click(id) {
    const sub_heading = document.getElementById(id).nextSibling.nextSibling
    const style = getComputedStyle(sub_heading);
    if (style.display == 'none') {
        sub_heading.style.display = 'block';
    }
    else {
        sub_heading.style.display = 'none';
    }
}

function content_click(id) {
    const active_item = document.getElementsByClassName('active-list-item')
    if (active_item.length !== 0) {
        active_item[0].classList.remove("active-list-item")
    }
    const new_active_item = document.getElementById(id)
    new_active_item.classList.add("active-list-item")
    var link = url + '#' + id;
    window.location = link.slice(0, -1)
}
