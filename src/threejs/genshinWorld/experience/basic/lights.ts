import * as THREE from 'three'
import type Experience from '../experience'
import { GUI } from 'lil-gui'
export default class Lights {
  scene
  renderer
  constructor(experience: Experience) {
    this.scene = experience.scene
    this.renderer = experience.renderer
    this.initAmbientLight()
    // this.initDirectionalLight()
    // this.initSpotLight()
  }

  initAmbientLight() {
    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.position.set(0, 0, 1).normalize()
    this.scene.add(dirLight)
  }

  initDirectionalLight() {
    const light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048
    light.position.set(-50, 100, -10)
    light.castShadow = true
    this.scene.add(light)
  }

  initSpotLight() {
    const light = new THREE.SpotLight(0xffffff)
    light.position.set(-50, 100, 30) // 设置聚光灯位置
    light.target.position.set(0, 0, 0) // 设置聚光灯目标位置
    light.angle = 0.2
    light.castShadow = true
    light.penumbra = 0.02
    this.scene.add(light)
    // GUI

    const gui = new GUI()
    const renderer = this.renderer
    const scene = this.scene

    const params = {
      color: light.color.getHex(),
      intensity: light.intensity,
      distance: light.distance,
      angle: light.angle,
      penumbra: light.penumbra,
      decay: light.decay,
      focus: light.shadow.focus,
      shadows: true
    }

    gui.addColor(params, 'color').onChange(function (val: any) {
      light.color.setHex(val)
    })

    gui.add(params, 'intensity', 0, 10).onChange(function (val: any) {
      light.intensity = val
    })

    gui.add(params, 'distance', 50, 200).onChange(function (val: any) {
      light.distance = val
    })

    gui.add(params, 'angle', 0, Math.PI / 3).onChange(function (val: any) {
      console.log('vvvvval', val)

      light.angle = val
    })

    gui.add(params, 'penumbra', 0, 1).onChange(function (val: any) {
      light.penumbra = val
    })

    gui.add(params, 'decay', 1, 2).onChange(function (val: any) {
      light.decay = val
    })

    gui.add(params, 'focus', 0, 1).onChange(function (val: any) {
      light.shadow.focus = val
    })

    gui.add(params, 'shadows').onChange(function (val: any) {
      renderer.shadowMap.enabled = val

      scene.traverse(function (child: any) {
        if (child.material) {
          child.material.needsUpdate = true
        }
      })
    })

    gui.open()
  }
}
