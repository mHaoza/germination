import * as THREE from 'three'
import type Experience from '../experience'

export default class World {
  experience
  resources
  animation
  constructor(experience: Experience) {
    this.experience = experience
    this.resources = experience.resources
    this.animation = experience.animation

    this.resources.on('loaded', () => {
      const Lumine = experience.resources.mmd['Lumine']
      this.experience.scene.add(Lumine.mesh)

      console.log('Lumine', Lumine)
      ;(Lumine.mesh.material as any[]).forEach((item) => {
        item.map.encoding = THREE.sRGBEncoding
      })

      this.animation.mmdHelper.add(Lumine.mesh, {
        animation: Lumine.animation
      })
    })
  }
}
