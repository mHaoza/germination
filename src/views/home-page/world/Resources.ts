// 资源管理器加载
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import resources from './Assets.js'

type Callback = () => void
interface IModles {
  [prop: string]: THREE.Group
}

export class Resources {
  private callback: Callback
  private manager: THREE.LoadingManager
  public textures
  public models: IModles

  constructor(callback: Callback) {
    // 资源加载完成的回调
    this.callback = callback
    // 贴图对象
    this.textures = {}
    // 模型对象
    this.models = {}

    this.manager = this.setLoadingManager()
    this.loadResources(this.manager)
  }

  // 管理加载状态
  setLoadingManager() {
    const manager = new THREE.LoadingManager()
    // 开始加载
    manager.onStart = (url, itemsLoaded, itemsTotal) => {
      console.log(
        'Started loading file: ' +
          url +
          '.\nLoaded ' +
          itemsLoaded +
          ' of ' +
          itemsTotal +
          ' files.'
      )
    }
    // 加载完成
    manager.onLoad = () => {
      console.log('Loading complete!')
      this.callback()
    }
    // 正在进行中
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      console.log(
        'Loading file: ' +
          url +
          '.\nLoaded ' +
          itemsLoaded +
          ' of ' +
          itemsTotal +
          ' files.'
      )
    }

    manager.onError = (url) => {
      console.log('There was an error loading ' + url)
    }

    return manager
  }

  // 加载资源
  loadResources(manager: THREE.LoadingManager) {
    const gltfLoader = new GLTFLoader(manager)

    resources.models.forEach((item) => {
      gltfLoader.load(item.url, (gltf) => {
        const model = gltf.scene
        this.models[item.name] = model
      })
    })
  }
}
