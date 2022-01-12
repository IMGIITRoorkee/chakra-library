const trimBreadcrumbs = breadcrumbs => {
  for (let i = 0; i < breadcrumbs.length; i++) {
    const breadSize = breadcrumbs[i].getBoundingClientRect()
    const breadWidth = breadSize.width
    const parent = breadcrumbs[i].parentElement
    const parentWidth = parent.getBoundingClientRect().width

    if (2 * breadWidth >= parentWidth) {
      const innerChildren = breadcrumbs[i].children
      if (innerChildren.length > 3) {
        const newInnerChildren = []
        newInnerChildren.push(innerChildren[0], innerChildren[1])
        const newDummyChild = document.createElement('a')
        newDummyChild.className = 'ui one-liner-captions'
        newDummyChild.innerHTML = '... '
        newInnerChildren.push(newDummyChild)
        newInnerChildren.push(
          innerChildren[innerChildren.length - 2],
          innerChildren[innerChildren.length - 1]
        )
        breadcrumbs[i].innerHTML = ''
        breadcrumbs[i].replaceChildren(...newInnerChildren)
      }
    }
  }
}

const breadcrumbs = document.querySelectorAll('.ui.breadcrumb')
if (breadcrumbs) {
  trimBreadcrumbs(breadcrumbs)
}
