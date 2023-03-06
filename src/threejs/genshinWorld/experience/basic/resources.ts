import * as THREE from 'three'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import EventEmitter from '@/utils/EventEmitter'

interface ILoaders {
  mmdLoader: MMDLoader
}

export interface ISource {
  name: string
  type: 'mmdModel'
  path: string
}

export interface IMmd {
  [prop: string]: THREE.SkinnedMesh
}
export default class Resources extends EventEmitter {
  sources
  loaders: ILoaders
  mmd: IMmd
  constructor(sources: ISource[]) {
    super()

    this.sources = sources
    this.mmd = {}
    this.loaders = this.setLoaders()

    this.startLoading()
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
      this.trigger('loaded')
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

  // 设置加载器
  setLoaders() {
    const manager = this.setLoadingManager()
    const mmdLoader = new MMDLoader(manager)

    return { mmdLoader }
  }

  // 开始加载
  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === 'mmdModel') {
        this.loaders.mmdLoader.load(source.path, (file) => {
          this.mmd[source.name] = file
        })
      }
    }
  }
}
