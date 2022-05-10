const url = window.location.href;

function head_click(id) {
    const element = document.getElementById(id).nextSibling.nextSibling
    const style = getComputedStyle(element);
    if (style.display == 'none') {
        element.style.display = 'block';
    }
    else if (style.display == 'block') {
        element.style.display = 'none';
    }
    else {
        console.log('invalid display style');
    }
}

function content_click(id) {
    const element1 = document.getElementsByClassName('active-list-item')
    if (element1.length != 0) {
        element1[0].classList.remove("active-list-item")
    }
    const element = document.getElementById(id)
    element.classList.add("active-list-item")
    var link = url + '#' + id;
    window.location = link.slice(0, -1)
}
