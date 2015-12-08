# pannable

Manage gesture input on a pannable scale, designed as a utility abstraction for
swiping carousel interfaces.

## Installation

```sh
npm install pannable
```

## Example

```js
import {createPannableRange} from 'pannable'

const carousel = createPannableRange()
const carouselEl = document.querySelector('.carousel')

const diffHandlers = {
  show ([index]) {
    carouselEl.childNodes[index].style.display = 'none'
  },
  hide ([index]) {
    carouselEl.childNodes[index].style.display = 'block'
  },
  translate ([index, offset]) {
    carouselEl.childNodes[index].style.transform = (
      `translate3d(0, ${offset * 100}%, 0)`
    )
  }
}

// Add a render handler
carousel.onRender((diffs) => {
  diffs.forEach(([type, ...args]) => diffHandlers[type](args))
})

carouselEl.addEventListener('touchstart', (e) => {
  const touch = e.touches[0]
  carousel.panStart(touch.clientY)
})

window.addEventListener('touchmove', (e) => {
  const touch = e.touches[0]
  carousel.panTo(touch.clientY)
})

window.addEventListener('touchend', (e) => {
  carousel.panStop()
})
```
