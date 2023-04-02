import * as THREE from 'three'
import type Experience from '../experience'

export default class World {
  experience
  resources
  constructor(experience: Experience) {
    this.experience = experience
    this.resources = experience.resources

    this.resources.on('loaded', () => {
      const Lumine = experience.resources.mmd['Lumine']
      this.experience.scene.add(Lumine)

      console.log('Lumine', Lumine)
      ;(Lumine.material as any[]).forEach((item) => {
        item.map.encoding = THREE.sRGBEncoding
      })
    })
  }
}
