/// <reference types="vite/client" />
/// <reference types="vite-plugin-glsl/ext" />

declare module '*.md' {
  import type { DefineComponent } from 'vue'
  const Component: DefineComponent
  const frontmatter: any
  export default Component
  export { frontmatter }
}

declare let Ammo: any

// interface Window {
//   experience: any
// }
