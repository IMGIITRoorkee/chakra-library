const lists = document.querySelectorAll('.ui.list')

for (let i=0; (lists !== null) && (i < lists.length); i++){
    let listItems = lists[i].getElementsByClassName('listItem');
    for (let j=0; (listItems !== null) && (j < listItems.length); j++){
        const divider = document.createElement('div')
        divider.className = "divider";
        listItems[j].appendChild(divider);
    }
}
