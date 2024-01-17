import isValidResolution from "./IsValidResolution";

export default function getResolutions(resolutions: string | number[] | string[]): number[] {
  if (typeof resolutions === 'string') {
    const resolutionStrings = resolutions.split(',').map(str => str.trim())

    const validResolutions = resolutionStrings.map(Number)
      .filter(isValidResolution)

    if (validResolutions.length !== resolutionStrings.length) throw new Error("Resolutions has invalid values.");
    
    return validResolutions
  }

  if (!resolutions.length) throw new Error("Resolutions cannot be empty, try provide your custom resolutions like this: '100,200,300'");
  
  return resolutions.map((resolution: string | number) => {
    const number = typeof resolution === 'number' ? resolution : Number(resolution)
    
    if (!isValidResolution(number)) throw new Error("Resolutions has invalid values.");
    
    return number
  })
}