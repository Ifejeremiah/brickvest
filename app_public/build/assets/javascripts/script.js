const sidebarElm = document.querySelectorAll('.main-sidebar .sidebar li a')
const yearElm = document.querySelector('.main-footer #yearstamp')
const bodyElm = document.querySelector('body')

attachYear()

function isMobile(width) {
  return window.matchMedia(`(max-width:${width}px)`).matches
}

if (isMobile(992)) {
  sidebarClose()
}

function sidebarClose() {
  sidebarElm.forEach((elm) => {
    elm.addEventListener('click', () => {
      bodyElm.classList.remove('sidebar-open')
    })
  })
}

function attachYear() {
  if (yearElm) {
    yearElm.textContent = new Date().getFullYear()
  }
}
