const lists = document.querySelectorAll('.ui.publication-list')

for (let i=0; (lists !== null) && (i < lists.length); i++){
    let listItems = lists[i].getElementsByClassName('publicationListItem');
    for (let j=0; (listItems !== null) && (j < listItems.length); j++){
        const divider = document.createElement('hr')
        listItems[j].appendChild(divider);
    }
}
