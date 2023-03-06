import * as THREE from 'three'
import type Experience from '../experience'

export default class Lights {
  scene
  ambentLight
  constructor(experience: Experience) {
    this.scene = experience.scene
    this.ambentLight = this.initAmbientLight()
  }

  initAmbientLight() {
    const ambentLight = new THREE.AmbientLight()
    this.scene.add(ambentLight)

    return ambentLight
  }
}
