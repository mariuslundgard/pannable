import {
  requestFrame,
  cancelFrame,
  arrayDiff,
  constrainIndex,
  calcTargetIndex,
  MIN_POSITION,
  DECAY
} from './helpers'

class PannableRange {
  constructor (opts = {}) {
    this.length = opts.length || 1
    this.width = opts.width || 0
    this.index = 0
    this.offset = 0
    this.startCursor = null
    this.startOffset = null
    this.startIndex = null
    this.cursor = null
    this.velocity = 0
    this.targetIndex = 0
    this.isPanning = false
    this.visibleItems = []
    this.callbacks = []
    this.render()
  }

  prev () {
    this.stopMotion()
    this.targetIndex = constrainIndex(this.targetIndex + 1, this.length)
    this.startMotion()
  }

  next () {
    this.stopMotion()
    this.targetIndex = constrainIndex(this.targetIndex - 1, this.length)
    this.startMotion()
  }

  panStart (cursor) {
    this.stopMotion()
    this.isPanning = true
    this.startIndex = this.index
    this.startOffset = this.offset
    this.startCursor = cursor
    this.cursor = cursor
  }

  panTo (cursor) {
    if (this.isPanning) {
      this.offset = this.startOffset + cursor - this.startCursor
      this.index = this.offset / this.width
      this.velocity = cursor - this.cursor
      this.cursor = cursor
      this.render()
    }
  }

  panStop () {
    if (this.isPanning) {
      this.isPanning = false
      this.startCursor = null
      this.startOffset = null
      this.cursor = null

      const absVelocity = Math.abs(this.velocity)

      // Calculate target index based on the current position and velocity
      if (absVelocity > 7 && absVelocity < this.width / 5) {
        const index = this.velocity < 0
          ? Math.round(this.startIndex - 1)
          : Math.round(this.startIndex + 1)

        this.velocity = 0
        this.targetIndex = constrainIndex(
          index,
          this.length
        )
      } else {
        this.targetIndex = calcTargetIndex(
          this.offset, this.velocity, this.width, this.length
        )
      }

      this.startIndex = null

      this.startMotion()
    }
  }

  tick () {
    const targetOffset = this.targetIndex * this.width
    const diff = targetOffset - this.offset
    const absDiff = Math.abs(diff)
    const absVelocity = Math.abs(this.velocity)

    if (absDiff > MIN_POSITION || absVelocity > MIN_POSITION) {
      // Move one step closer to the target position
      this.offset += (diff / 11) + this.velocity
      this.index = this.offset / this.width
      this.velocity *= DECAY
      this.startMotion()
    } else {
      // Lock the target position
      this.index = this.targetIndex
      this.offset = this.targetIndex * this.width
      this.tickId = null
    }

    this.render()
  }

  startMotion () {
    this.tickId = requestFrame(this.tick.bind(this))
  }

  stopMotion () {
    if (this.tickId) {
      cancelFrame(this.tickId)

      this.tickId = null
    }
  }

  render () {
    const nextIndex = Math.ceil(0 - this.index)
    const currIndex = nextIndex - 1
    const nextVisibleItems = []
    const translateDiff = []

    if (currIndex >= 0 && currIndex < this.length) {
      nextVisibleItems.push(currIndex)
      translateDiff.push([
        'translate', currIndex, this.index + currIndex
      ])
    }

    if (nextIndex >= 0 && nextIndex < this.length) {
      nextVisibleItems.push(nextIndex)
      translateDiff.push([
        'translate', nextIndex, this.index + nextIndex
      ])
    }

    const hideDiff = arrayDiff(this.visibleItems, nextVisibleItems)
      .map((i) => ['hide', i])

    const showDiff = arrayDiff(nextVisibleItems, this.visibleItems)
      .map((i) => ['show', i])

    this.visibleItems = nextVisibleItems

    this.callbacks.forEach((cb) => {
      cb(hideDiff.concat(showDiff).concat(translateDiff))
    })
  }

  onRender (cb) {
    this.callbacks.push(cb)
  }
}

export function createPannableRange (opts) {
  return new PannableRange(opts)
}
