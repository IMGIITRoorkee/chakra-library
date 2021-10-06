var numberedLists = document.querySelectorAll('.ui.numbered-list')

for (var i=0; (numberedLists !== null) && (i < numberedLists.length); i++){
    var currNo = 1;
    var lists = numberedLists[i].getElementsByClassName('list');
    for (var j=0; (lists !== null) && (j < lists.length); j++) {
        var itemNo = document.createElement("div");
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