const numberedLists = document.querySelectorAll('.ui.numbered-list')

for (let i=0; (numberedLists !== null) && (i < numberedLists.length); i++){
    let currNo = 1;
    let lists = numberedLists[i].getElementsByClassName('list');
    for (let j=0; (lists !== null) && (j < lists.length); j++) {
        let title = lists[j].getElementsByClassName('sub-heading');
        let desc = lists[j].getElementsByClassName('description');
        if (desc.length === 0){
            title[0].style.marginBottom = 0;
            let contents = lists[j].getElementsByClassName('content-flex')[0];
            contents.style.justifyContent = "center";
        }
        const itemNo = document.createElement("div");
        if (currNo <= 9){
            itemNo.innerHTML = "0" + currNo
        } else {
            itemNo.innerHTML = currNo;
        }
        itemNo.className='item-no';
        lists[j].prepend(itemNo)
        currNo++;
    }
}
