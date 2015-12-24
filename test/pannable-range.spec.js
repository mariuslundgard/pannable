/* global describe, it, beforeEach */
/* eslint init-declarations: 0 */

import {assert} from 'chai'
import {createPannableRange} from '../src/pannable-range'

describe('pannable-range', () => {
  const rangeOpts = {
    length: 10,
    width: 100
  }

  let range

  beforeEach(() => {
    range = createPannableRange(rangeOpts)
  })

  it('should pan and snap to the next index', (done) => {
    assert.equal(range.offset, 0)

    // Start panning
    range.panStart(90)
    assert.equal(range.startOffset, 0)
    assert.equal(range.startCursor, 90)
    assert.equal(range.cursor, 90)
    assert.equal(range.offset, 0)
    assert.equal(range.velocity, 0)

    // Move
    range.panTo(80)
    assert.equal(range.startCursor, 90)
    assert.equal(range.cursor, 80)
    assert.equal(range.offset, -10)
    assert.equal(range.velocity, -10)

    // Move
    range.panTo(60)
    assert.equal(range.startCursor, 90)
    assert.equal(range.cursor, 60)
    assert.equal(range.offset, -30)
    assert.equal(range.velocity, -20)

    // Let go
    range.panStop()

    setTimeout(() => {
      assert.equal(range.index, -1)
      done()
    }, 1800)
  })
})
