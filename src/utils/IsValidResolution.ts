export default function isValidResolution(resolution: number): boolean {
  return typeof resolution === 'number' && !isNaN(resolution) && isFinite(resolution) && resolution !== 0 && resolution > 0
}
