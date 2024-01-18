declare global {
  namespace JSX {
      interface IntrinisicElements {
          'opt-image': { resolutions: string[] | number[], imageUrl: string }
      }
  }
}
