/* eslint max-len: 0 */
/* eslint complexity: 0 */
/* eslint id-match: 0 */
/* eslint lines-around-comment: 0 */
/* eslint no-inline-comments: 0 */
/* eslint no-magic-numbers: 0 */
/* eslint no-ternary: 0 */
/* eslint operator-linebreak: 0 */
/* eslint padded-blocks: 0 */
/* eslint space-before-keywords: 0 */
/* eslint no-restricted-syntax: [2, "WithStatement"] */

import {createPannableRange} from '../src/pannable-range'

const carouselEl = document.querySelector('.carousel')
const indexEl = document.querySelector('.index')
const fpsEl = document.querySelector('.fps')
const fpsGraphEl = document.querySelector('.fps-graph')
const prevEl = document.querySelector('.prev-btn')
const nextEl = document.querySelector('.next-btn')
const fpsSample = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const photos = [
  'http://www.ncpress.com/assets/winners-website/DivC/c%20gen%20news%20photo%202nd.jpg',
  'http://bloximages.chicago2.vip.townnews.com/lee.net/content/tncms/assets/v3/editorial/c/6f/c6f291e8-e91a-11e4-a3a8-47373b62b823/5537e408b6f38.image.jpg',
  'http://www.speos-photo.com/wp-content/uploads/2014/07/Devenir-Photojournaliste-Speos-02.jpg',
  'http://4.bp.blogspot.com/-gxj3kpXUKTo/T30ENqfQz9I/AAAAAAAABsE/4S_82myZpPQ/s1600/2011-military-photography-award-winners-news-MC1-chad-d-runge-three-cheers-us-naval-academy-class-of-2011-graduation.jpg',
  'https://cdn-www.eyeem.com/blog/wp-content/uploads/2010/10/rse_eddie-adams_saigon-execution_1968_vietnam_v3.jpg',
  'http://caad.msstate.edu/wpmu/artnews/files/2013/03/Tim-and-Timothy.jpg',
  'http://www.armymwr.com/images/news/0949-cannon.jpg',
  'https://d2exqf27hvm6dn.cloudfront.net/wp-content/uploads/2013/10/KNS002.jpg',
  'http://2.bp.blogspot.com/-ZaVfgIRFcfw/UXJa-JMP7SI/AAAAAAAAE_0/7nwgiCPCj-Q/s1600/My+Photography+Student.jpg',
  'https://sgphotographer.files.wordpress.com/2012/05/sg_news_01.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/4/4c/Defense.gov_News_Photo_111218-M-MM918-007_-_U.S._Marine_Corps_Sgt._Jeremy_Holsten_right_a_squad_leader_with_3rd_Platoon_Lima_Company_3rd_Battalion_3rd_Marine_Regiment_interacts_with.jpg'
]

let lastTime = new Date().getTime()

function getFps () {
  requestAnimationFrame(() => {
    const currTime = new Date().getTime()
    const diffTime = currTime - lastTime

    fpsSample.shift()
    fpsSample.push(Math.round(1000 / diffTime))

    const fps = fpsSample.reduce((a, b) => a + b) / fpsSample.length

    fpsEl.innerHTML = fps.toFixed(1)

    lastTime = currTime

    const item = document.createElement('div')

    item.style.height = `${Math.max(44 - ((1000 / diffTime) / 2), 0)}px`
    fpsGraphEl.appendChild(item)

    if (fpsGraphEl.childNodes.length > 100) {
      fpsGraphEl.removeChild(fpsGraphEl.firstChild)
    }

    getFps()
  })
}

photos.forEach((photo) => {
  const paneEl = document.createElement('div')

  paneEl.className = 'pane'
  paneEl.style.backgroundImage = `url(${photo})`
  carouselEl.appendChild(paneEl)
})

const range = createPannableRange({
  length: photos.length,
  width: Math.max(
    document.documentElement.clientHeight, window.innerHeight || 0
  )
})

const diffHandlers = {
  hide ([index]) {
    carouselEl.childNodes[index].style.display = 'none'
  },
  show ([index]) {
    carouselEl.childNodes[index].style.display = 'block'
  },
  translate ([index, offset]) {
    carouselEl.childNodes[index].style.opacity = offset + 1
    carouselEl.childNodes[index].style.transform = (
      `translate3d(0, ${offset * 100}%, 0)`
    )
  }
}

range.onRender((diff) => {
  indexEl.innerHTML = `${Math.abs(0 - range.index).toFixed(3)}`

  diff.forEach(([type, ...args]) => {
    diffHandlers[type](args)
  })
})

// carouselEl.addEventListener('mousedown', (e) => {
carouselEl.addEventListener('touchstart', (e) => {
  // const touchY = e.clientY
  const touchY = e.touches[0].clientY // e.clientY

  e.stopPropagation()
  e.preventDefault()

  range.panStart(touchY)
})

// window.addEventListener('mousemove', (e) => {
window.addEventListener('touchmove', (e) => {
  if (range.isPanning) {
    // const touchY = e.clientY
    const touchY = e.touches[0].clientY // e.clientY

    e.stopPropagation()
    e.preventDefault()

    range.panTo(touchY)
  }
})

// window.addEventListener('mouseup', (e) => {
window.addEventListener('touchend', (e) => {
  if (range.isPanning) {
    e.stopPropagation()
    e.preventDefault()

    range.panStop()
  }
})

window.range = range

prevEl.addEventListener('click', () => {
  range.prev()
})

nextEl.addEventListener('click', () => {
  range.next()
})

getFps()
