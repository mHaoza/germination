import Sizes from '@/utils/Sizes'
import Time from '@/utils/Time'
import * as THREE from 'three'
import { Camera, Lights, Renderer, Controls, Resources, assets } from './basic'
import World from './world/world'

export default class Experience {
  public sizes
  public time
  public scene
  public camera
  public lights
  public renderer
  public controls
  public resources
  public domElement
  public world

  constructor(domElement: HTMLDivElement) {
    this.domElement = domElement
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.camera = new Camera(this)
    this.lights = new Lights(this)
    this.renderer = new Renderer(this)
    this.controls = new Controls(this)
    this.resources = new Resources(assets)
    this.world = new World(this)

    this.sizes.on('resize', () => {
      this.resize()
    })
    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }
  update() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    this.resources.update(this.time.delta / 1000)
  }
}
