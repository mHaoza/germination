import * as THREE from 'three'
import type { Group, WebGLRenderer } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import EventEmitter from './EventEmitter'

interface ILoaders {
  dracoLoader: DRACOLoader
  gltfLoader: GLTFLoader
  objLoader: OBJLoader
  textureLoader: THREE.TextureLoader
  cubeTextureLoader: THREE.CubeTextureLoader
  basisTextureLoader: BasisTextureLoader
  KTX2TextureLoader: KTX2Loader
}

export interface ISource {
  name: string
  type:
    | 'gltfModel'
    | 'objModel'
    | 'texture'
    | 'basisTexture'
    | 'KTX2Texture'
    | 'videoTexture'
  path: string
}
export default class Resources extends EventEmitter {
  sources
  renderer

  items: {
    [prop: string]: any
  }
  toLoad
  loaded

  video: {
    [prop: string]: HTMLVideoElement
  }
  videoTexture: any

  carousel1: any[]
  carousel2: any[]

  loaders!: ILoaders
  constructor(sources: ISource[], renderer?: WebGLRenderer) {
    super()

    this.sources = sources
    this.renderer = renderer

    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.video = {}
    this.videoTexture = {}

    this.carousel1 = []
    this.carousel2 = []

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {} as ILoaders
    this.loaders.dracoLoader = new DRACOLoader()
    this.loaders.dracoLoader.setDecoderPath('/draco/')
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

    this.loaders.basisTextureLoader = new BasisTextureLoader()
    this.loaders.basisTextureLoader.setTranscoderPath('/basis/')
    this.renderer &&
      this.loaders.basisTextureLoader.detectSupport(this.renderer)

    this.loaders.KTX2TextureLoader = new KTX2Loader()
    this.loaders.KTX2TextureLoader.setTranscoderPath('/basis/')
    this.renderer && this.loaders.KTX2TextureLoader.detectSupport(this.renderer)

    this.loaders.objLoader = new OBJLoader()
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded<GLTF>(source, file)
        })
      } else if (source.type === 'objModel') {
        this.loaders.objLoader.load(source.path, (file) => {
          this.sourceLoaded<Group>(source, file)
        })
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path, (file) => {
          file.flipY = false
          file.encoding = THREE.sRGBEncoding
          this.sourceLoaded<THREE.Texture>(source, file)
        })
      } else if (source.type === 'basisTexture') {
        this.loaders.basisTextureLoader.load(source.path, (file) => {
          file.encoding = THREE.sRGBEncoding
          this.sourceLoaded<THREE.CompressedTexture>(source, file)

          if (source.path.includes('smallScreen1')) {
            this.carousel1.push(file)
          }

          if (source.path.includes('smallScreen2')) {
            this.carousel2.push(file)
          }
        })
      } else if (source.type === 'KTX2Texture') {
        this.loaders.KTX2TextureLoader.load(source.path, (file) => {
          file.encoding = THREE.sRGBEncoding
          this.sourceLoaded<THREE.CompressedTexture>(source, file)

          // if(source.path.includes("smallScreen1"))
          // {this.carousel1.push(file)}

          // if(source.path.includes("smallScreen2"))
          // {this.carousel2.push(file)}
        })
      } else if (source.type === 'videoTexture') {
        this.video[source.name] = document.createElement('video')

        this.video[source.name].src = source.path

        this.video[source.name].muted = true
        this.video[source.name].playsInline = true
        this.video[source.name].autoplay = true
        this.video[source.name].loop = true
        // this.video[source.name].play()

        this.videoTexture[source.name] = new THREE.VideoTexture(
          this.video[source.name]
        )
        this.videoTexture[source.name].flipY = false
        this.videoTexture[source.name].minFilter = THREE.NearestFilter
        this.videoTexture[source.name].magFilter = THREE.NearestFilter
        this.videoTexture[source.name].generateMipmaps = false
        this.videoTexture[source.name].encoding = THREE.sRGBEncoding

        this.sourceLoaded(source, this.videoTexture[source.name])
      }
    }
  }

  sourceLoaded<T>(source: ISource, file: T) {
    this.trigger('itemLoaded')

    this.items[source.name] = file
    this.loaded++

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }
}
