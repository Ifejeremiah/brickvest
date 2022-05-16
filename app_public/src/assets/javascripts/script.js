const sidebarElm = document.querySelectorAll('.main-sidebar .sidebar li a')
const bodyElm = document.querySelector('body')


if (isMobile(992)) {
  sidebarClose()
}

function isMobile(width) {
  return window.matchMedia(`(max-width:${width}px)`).matches
}

function sidebarClose() {
  sidebarElm.forEach((elm) => {
    elm.addEventListener('click', () => {
      bodyElm.classList.remove('sidebar-open')
    })
  })
}

