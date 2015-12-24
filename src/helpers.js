export const SECOND = 1000
export const FPS = 60
export const TIMEOUT = SECOND / FPS
export const MIN_POSITION = 0.25
export const DECAY = 0.9
export const EOA = -1

const isWindow = typeof window !== 'undefined'

export function constrainIndex (index, length) {
  return Math.max(Math.min(Math.round(index), 0), 1 - length)
}

export function calcTargetIndex (offset, velocity, width, length) {
  const currOffset = offset + (velocity * (DECAY / 2 * 10))

  return constrainIndex(currOffset / width, length)
}

export function requestFrame (cb) {
  return isWindow ? window.requestAnimationFrame(cb) : setTimeout(cb, TIMEOUT)
}

export function cancelFrame (frameId) {
  return isWindow ? window.cancelAnimationFrame(frameId) : clearTimeout(frameId)
}

export function arrayDiff (a, b) {
  return a.filter((v) => b.indexOf(v) === EOA)
}
