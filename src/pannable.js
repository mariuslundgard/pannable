// eslint-disable-next-line no-confusing-arrow
const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

const createTween = (to, steps) => {
  const ret = []

  let i = 0

  for (; i < steps - 1; i += 1) {
    ret.push(easeInOutQuad(i / steps) * to)
  }

  ret.push(to)

  return ret
}

const calcDecay = (decayMultiplier, v) => {
  const decay = []
  const m = v < 0 ? 0 - decayMultiplier : decayMultiplier

  let currV = Math.abs(v)

  while (currV > 0.5) {
    currV = currV * 0.9
    decay.push(currV * m)
  }

  return decay
}

export const createPannable = (opts = {}) => {
  const pannable = {
    index: opts.index || 0,
    length: opts.length || 0,
    width: opts.width || 0,
    cursor: null,
    position: 0,
    velocity: 0,
    isMoving: false,
    decayMultiplier: opts.decayMultiplier || 0.9,
  }

  const listeners = {
    move: [],
    slide: []
  }

  const on = (type, callback) => {
    if (listeners[type]) {
      listeners[type].push(callback)
    }
  }

  const trigger = (type, ...args) => {
    if (listeners[type]) {
      listeners[type].forEach((callback) => callback(...args))
    }
  }

  const setPosition = (p) => {
    pannable.position = p
  }

  const start = (c) => {
    pannable.cursor = c
    pannable.isMoving = true
  }

  const move = (c) => {
    pannable.velocity = c - pannable.cursor
    pannable.cursor = c
    pannable.position += pannable.velocity

    trigger('move', pannable.position)
  }

  const stop = () => {
    const v = pannable.velocity

    let p = pannable.position

    pannable.velocity = 0
    pannable.cursor = null
    pannable.isMoving = false

    if (v) {
      const positions = calcDecay(pannable.decayMultiplier, v)
        .map((offset) => {
          p = p + offset
          return p
        })

      const len = positions.length
      const lastDecayPosition = positions[len - 1]
      const targetIndex = Math.min(Math.max(Math.round(lastDecayPosition / pannable.width), 0 - pannable.length + 1), 0)
      const targetPosition = pannable.width * targetIndex
      const targetDiff = lastDecayPosition - targetPosition
      const targetTween = createTween(targetDiff, len)

      trigger('slide', positions.map((p, ix) => p - targetTween[ix]))
    }
  }

  return Object.assign(pannable, {
    start,
    move,
    stop,
    on,
    setPosition
  })
}
