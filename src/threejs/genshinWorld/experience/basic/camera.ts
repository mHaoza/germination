import * as THREE from 'three'
import type Experience from '../experience'

export class Camera extends THREE.PerspectiveCamera {
  constructor(experience: Experience) {
    const domElement = experience.domElement
    super(45, domElement.offsetWidth / domElement.offsetHeight, 1, 1000)

    this.initParams()
  }

  initParams() {
    this.position.y = 5
  }
}
