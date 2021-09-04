var imagePath = "../../library/assets/images/breadcrumbs/right-arrow.svg"

    var breadcrumbs = document.querySelectorAll('.ui.breadcrumb')
    for(var i = 0; (breadcrumbs !== null) && (i < breadcrumbs.length); i++){
        var arrowDividers = breadcrumbs[i].getElementsByClassName('divider arrow')
        for(var j = 0; (arrowDividers !== null) && (j < arrowDividers.length); j++){
            arrowDividers[j].innerHTML = ""
            var arrow = document.createElement('img')
            arrow.setAttribute('src', imagePath)
            arrowDividers[j].appendChild(arrow)
        }

        var slashDividers = breadcrumbs[i].getElementsByClassName('divider slash')
        for(var j = 0; (slashDividers !== null) && (j < slashDividers.length); j++){
            slashDividers[j].innerHTML = "/"
        }

    }
