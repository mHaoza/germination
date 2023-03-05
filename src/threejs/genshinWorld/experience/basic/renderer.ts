import * as THREE from 'three'
import type Experience from '../experience'

export class Renderer extends THREE.WebGLRenderer {
  experience
  constructor(experience: Experience) {
    super({
      alpha: true, // 透明
      antialias: true, // 抗锯齿
      preserveDrawingBuffer: true // 是否保留缓直到手动清除或被覆盖
    })
    this.experience = experience
    // 添加到dom中
    experience.domElement.appendChild(this.domElement)

    // 初始化配置
    this.initParams()
  }

  initParams() {
    this.outputEncoding = THREE.sRGBEncoding
    this.setPixelRatio(window.devicePixelRatio) // 设置屏幕像素比
    this.setSize(window.innerWidth, window.innerHeight) // 设置渲染器宽高
    this.setClearColor(0x000000) // 设置背景色
  }
  resize() {
    this.setSize(this.experience.sizes.width, this.experience.sizes.height)
    this.setPixelRatio(Math.min(this.experience.sizes.pixelRatio, 2))
  }
}
