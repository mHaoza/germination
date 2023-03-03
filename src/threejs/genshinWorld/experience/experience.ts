import * as THREE from 'three'
import { Camera, Renderer } from './basic'
import World from './world/world'

export default class Experience {
  public scene
  public camera
  public renderer
  public domElement
  public world

  constructor(domElement: HTMLDivElement) {
    this.domElement = domElement
    this.scene = new THREE.Scene()
    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    // this.scene = new THREE.Scene()
    // this.camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // )
    // this.renderer = new THREE.WebGLRenderer()
    // this.renderer.setSize(window.innerWidth, window.innerHeight)
    // this.domElement.appendChild(this.renderer.domElement)
    this.world = new World(this)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
    this.renderer.render(this.scene, this.camera)
  }
}
