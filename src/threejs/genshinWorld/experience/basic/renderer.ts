import * as THREE from 'three'
import type Experience from '../experience'

export class Renderer extends THREE.WebGLRenderer {
  constructor(experience: Experience) {
    super({
      alpha: true, // 透明
      antialias: true, // 抗锯齿
      preserveDrawingBuffer: true // 是否保留缓直到手动清除或被覆盖
    })

    const { domElement } = experience
    this.initParams(domElement)
  }

  initParams(domElement: HTMLDivElement) {
    domElement.appendChild(this.domElement) // 添加到dom中
    this.outputEncoding = THREE.sRGBEncoding
    this.setPixelRatio(window.devicePixelRatio) // 设置屏幕像素比
    this.setSize(window.innerWidth, window.innerHeight) // 设置渲染器宽高
    this.setClearColor(0x000000) // 设置背景色
  }
}
