/* global describe, it */
/* eslint-disable max-nested-callbacks */

import assert from 'assert'
import {createPannable} from '../src/pannable'

describe('pannable', () => {
  describe('options', () => {
    it('should accept options', () => {
      const pannable = createPannable({
        index: 5,
        length: 10,
        width: 100,
      })

      assert.equal(pannable.index, 5)
      assert.equal(pannable.length, 10)
      assert.equal(pannable.width, 100)
      assert.equal(pannable.position, null)
      assert.equal(pannable.velocity, 0)
      assert.equal(pannable.isMoving, false)
    })
  })

  describe('move', () => {
    it('should start tracking position', () => {
      const pannable = createPannable({
        index: 5,
        length: 10,
        width: 100,
      })

      pannable.start(0)

      assert.equal(pannable.position, 0)
      assert.equal(pannable.isMoving, true)
    })

    it('should move the position', () => {
      const pannable = createPannable({
        index: 5,
        length: 10,
        width: 100,
      })

      pannable.start(0)
      pannable.move(50)

      assert.equal(pannable.position, 50)
      assert.equal(pannable.isMoving, true)
    })

    it('should stop tracking the position', () => {
      const pannable = createPannable({
        index: 5,
        length: 10,
        width: 100,
      })

      pannable.start(0)
      pannable.move(50)
      pannable.stop()

      assert.equal(pannable.position, null)
      assert.equal(pannable.isMoving, false)
    })

    it('should yield decay positions when stopped', (done) => {
      const pannable = createPannable({
        index: 5,
        length: 10,
        width: 1,
        decayMultiplier: 0.5,
      })

      pannable.start(0.75)
      pannable.move(0)

      pannable.stop((decayPositions) => {
        assert.equal(decayPositions.length, 4)
        done()
      })
    })
  })
})
