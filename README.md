# pannable

A low-level abstraction for dealing with input on a pannable scale. Ideal for touch-enabled slider interfaces.

## Installation

```sh
npm install pannable --save
```

## Example

```js
import {createPannable} from 'pannable'

const pannable = createPannable({length: 10, width: 800})
const pannableEl = document.querySelector('.pannable')

pannable.on('move', (position) => pannableEl.style.left = `${position}px`)

// Setup event handlers to trigger panning
pannableEl.addEventListener('touchstart', (event) => pannable.start(event.touches[0].clientX))
addEventListener('touchmove', (event) => pannable.move(event.touches[0].clientX))
addEventListener('touchend', () => pannable.stop())
```
