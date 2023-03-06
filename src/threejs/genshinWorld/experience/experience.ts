import Sizes from '@/utils/Sizes'
import Time from '@/utils/Time'
import * as THREE from 'three'
import { Camera, Renderer, Controls, Resources, assets } from './basic'
import World from './world/world'

export default class Experience {
  public sizes
  public time
  public scene
  public camera
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
    this.renderer = new Renderer(this)
    this.controls = new Controls(this)
    this.resources = new Resources(assets)
    this.world = new World(this)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)

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
  }
}
