import {describe, expect, test} from '@jest/globals'
import getResolutions from "../utils/GetResolutions"

describe('get resolutions module', () => {
  test('getResolutions should return valid resolutions array from string', () => {
    const resolutions = getResolutions('100,200,300')
  
    expect(resolutions).toEqual([100, 200, 300])
  })

  test('getResolutions should return valid resolutions array from array of numbers', () => {
    const resolutions = getResolutions([100,200,300])
  
    expect(resolutions).toEqual([100,200,300])
  })

  test('getResolutions should return valid resolutions array from array of strings', () => {
    const resolutions = getResolutions(['100','200','300'])
  
    expect(resolutions).toEqual([100,200,300])
  })

  test('getResolutions should return valid resolutions array with one value', () => {
    const resolutions = getResolutions('200')
  
    expect(resolutions).toEqual([200])
  })
  
  test('getResolutions should throw an error for invalid resolutions with NaN', () => {
    const invalidCall = () => getResolutions('100,200,invalid,300')
  
    expect(invalidCall).toThrowError("Resolutions has invalid values.")
  })

  test('getResolutions should throw an error for invalid resolutions with infinity', () => {
    const invalidCall = () => getResolutions([100,Infinity,200,300])
  
    expect(invalidCall).toThrowError("Resolutions has invalid values.")
  })

  test('getResolutions should throw an error for invalid resolutions with zero', () => {
    const invalidCall = () => getResolutions([100,0,200,0])
  
    expect(invalidCall).toThrowError("Resolutions has invalid values.")
  })


  test('getResolutions should throw an error for invalid resolutions with empty value', () => {
    const invalidCall = () => getResolutions(' ')
  
    expect(invalidCall).toThrowError("Resolutions has invalid values.")
  })

  test('getResolutions should throw an error for invalid resolutions with empty array', () => {
    const invalidCall = () => getResolutions([])
  
    expect(invalidCall).toThrowError("Resolutions cannot be empty, try provide your custom resolutions like this: '100,200,300'")
  })
})