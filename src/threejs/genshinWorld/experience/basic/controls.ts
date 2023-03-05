import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type Experience from '../experience'

export class Controls extends OrbitControls {
  constructor(experience: Experience) {
    super(experience.camera, experience.renderer.domElement)
  }
}
