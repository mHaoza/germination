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
      const Amber = experience.resources.mmd['Amber']
      const Xiangling = experience.resources.mmd['Xiangling']
      this.experience.scene.add(Lumine.mesh, Amber.mesh, Xiangling.mesh)
      Amber.mesh.position.set(15, 0, 0)
      Xiangling.mesh.position.set(-15, 0, 0)

      Xiangling.mesh.rotation.y = Math.PI / 18
      Amber.mesh.rotation.y = -Math.PI / 18

      // 阴影
      Lumine.mesh.castShadow = true
      Xiangling.mesh.castShadow = true
      Amber.mesh.castShadow = true

      // 修改色彩通道
      ;(Lumine.mesh.material as any[]).forEach((item) => {
        item.map.encoding = THREE.sRGBEncoding
      })
      ;(Amber.mesh.material as any[]).forEach((item) => {
        item.map.encoding = THREE.sRGBEncoding
      })
      ;(Xiangling.mesh.material as any[]).forEach((item) => {
        item.map.encoding = THREE.sRGBEncoding
      })

      this.animation.mmdHelper.add(Lumine.mesh, {
        animation: Lumine.animation
      })
      this.animation.mmdHelper.add(Amber.mesh, {
        animation: Amber.animation
      })
      this.animation.mmdHelper.add(Xiangling.mesh, {
        animation: Xiangling.animation
      })
    })
  }
}
