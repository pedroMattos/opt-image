import {describe, expect, test} from '@jest/globals'
import isValidResolution from '../utils/IsValidResolution'

describe('is valid resolution module', () => {
  test('isValidResolution return true to a valid resolution', () => {
    expect(isValidResolution(100)).toBe(true)
    expect(isValidResolution(800)).toBe(true)
    expect(isValidResolution(1920)).toBe(true)
  })

  test('isValidResolution return false to a invalid resolution', () => {
    expect(isValidResolution('string')).toBe(false)
    expect(isValidResolution(NaN)).toBe(false)
    expect(isValidResolution(Infinity)).toBe(false)
    expect(isValidResolution(0)).toBe(false)
    expect(isValidResolution(-500)).toBe(false)
  })
})
