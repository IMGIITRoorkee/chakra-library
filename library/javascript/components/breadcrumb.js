const imagePath = "../../library/assets/images/breadcrumbs/right-arrow.svg";

const breadcrumbs = document.querySelectorAll(".ui.breadcrumb");
for (let i = 0; breadcrumbs !== null && i < breadcrumbs.length; i++) {
  const breadSize = breadcrumbs[i].getBoundingClientRect();
  const breadWidth = breadSize.width;
  const parent = breadcrumbs[i].parentElement;
  const parentWidth = parent.getBoundingClientRect().width;

  if (breadWidth >= parentWidth) {
    const innerChildren = breadcrumbs[i].children;
    if (innerChildren.length > 3) {
      const newInnerChildren = [];
      newInnerChildren.push(innerChildren[0], innerChildren[1]);
      const newDummyChild = document.createElement("a");
      newDummyChild.className = "section";
      newDummyChild.innerHTML = "...";
      newInnerChildren.push(newDummyChild);
      newInnerChildren.push(
        innerChildren[innerChildren.length - 2],
        innerChildren[innerChildren.length - 1]
      );
      breadcrumbs[i].innerHTML = "";
      breadcrumbs[i].replaceChildren(...newInnerChildren);
    }
  }

  const arrowDividers = breadcrumbs[i].getElementsByClassName("divider arrow");
  for (let j = 0; arrowDividers !== null && j < arrowDividers.length; j++) {
    arrowDividers[j].innerHTML = "";
    const arrow = document.createElement("img");
    arrow.setAttribute("src", imagePath);
    arrowDividers[j].appendChild(arrow);
  }

  const slashDividers = breadcrumbs[i].getElementsByClassName("divider slash");
  for (let j = 0; slashDividers !== null && j < slashDividers.length; j++) {
    slashDividers[j].innerHTML = "/";
  }

  const sections = breadcrumbs[i].getElementsByClassName("section");
  const pageUrl = window.location.pathname
  const urlParents = pageUrl.split('/').filter(Boolean)
  for(let section of sections){
    if(urlParents.includes(section.dataset.url)){
      section.className+=' active'
    }
  }
}
