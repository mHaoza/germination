import * as THREE from 'three'
import type Experience from '../experience'

export class Camera extends THREE.PerspectiveCamera {
  experience
  constructor(experience: Experience) {
    super(45, experience.sizes.width / experience.sizes.height, 1, 1000)
    this.experience = experience

    this.initParams()
  }

  initParams() {
    this.position.z = 5
  }
  resize() {
    this.aspect = this.experience.sizes.width / this.experience.sizes.height
    this.updateProjectionMatrix()
  }
}
