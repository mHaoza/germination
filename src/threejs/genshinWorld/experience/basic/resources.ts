import * as THREE from 'three'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'
import EventEmitter from '@/utils/EventEmitter'

interface ILoaders {
  mmdLoader: MMDLoader
}

export interface ISource {
  name: string
  type: 'mmdModel'
  path: string
  animations: { name: string; path: string }[]
}

export interface IMmd {
  [prop: string]: THREE.SkinnedMesh
}

export default class Resources extends EventEmitter {
  sources
  loaders: ILoaders
  mmd: IMmd
  mmdHelper: MMDAnimationHelper
  constructor(sources: ISource[]) {
    super()

    this.sources = sources
    this.mmd = {}
    this.mmdHelper = new MMDAnimationHelper()
    this.loaders = this.setLoaders()

    Ammo().then((AmmoLib: any) => {
      Ammo = AmmoLib

      this.startLoading()
    })
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
        const vmdUrl = source.animations?.map((item) => {
          return item.path
        })
        this.loaders.mmdLoader.loadWithAnimation(source.path, vmdUrl, (obj) => {
          this.mmd[source.name] = obj.mesh
          this.mmdHelper.add(obj.mesh, {
            animation: obj.animation
          })
        })
      }
    }
  }
}
