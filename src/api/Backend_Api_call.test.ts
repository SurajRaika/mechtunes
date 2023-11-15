// sum.test.js
import { expect, test } from 'vitest'
import { set_track } from './Backend_Api_call'

test('adds 1 + 2 to equal 3', () => {
  expect(set_track("/home/surajraika/Downloads/someSound/someosund")).toBe(3)
})