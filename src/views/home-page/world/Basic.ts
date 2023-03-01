import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface IBasicOptions {
  dom: HTMLElement
}

export default class Basic {
  private dom: HTMLElement
  public scene: THREE.Scene
  public camera
  public renderer
  public controls

  constructor(options: IBasicOptions) {
    this.dom = options.dom

    this.scene = this.initScene()
    this.camera = this.initCamera()
    this.renderer = this.initRenderer()
    this.initLights(this.scene)
    this.controls = this.initControls(this.camera, this.renderer)

    // const geometry = new THREE.BoxGeometry(100, 100, 100)
    // const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    // const cube = new THREE.Mesh(geometry, material)
    // this.scene.add(cube)
  }

  initScene() {
    return new THREE.Scene()
  }

  initCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      100000
    )
    camera.position.set(100, 100, 100)

    return camera
  }

  initRenderer() {
    const renderer = new THREE.WebGLRenderer({
      alpha: true, // 透明
      antialias: true, // 抗锯齿
      preserveDrawingBuffer: true // 是否保留缓直到手动清除或被覆盖
    })
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setPixelRatio(window.devicePixelRatio) // 设置屏幕像素比
    renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器宽高
    renderer.setClearColor(0x000000)
    this.dom.appendChild(renderer.domElement) // 添加到dom中

    return renderer
  }

  initLights(scene: THREE.Scene) {
    // 环境光照和平行光
    const aLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(aLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(1, 1, 0)
    scene.add(directionalLight)

    // const axesHelper = new THREE.AxesHelper(1000);
    // this.scene.add(axesHelper);
  }

  // 设置控制器
  initControls(camera: THREE.Camera, renderer: THREE.Renderer) {
    // 鼠标控制      相机，渲染dom
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.autoRotateSpeed = 3
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = false
    // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
    controls.dampingFactor = 0.05
    // 是否可以缩放
    controls.enableZoom = true
    // 设置相机距离原点的最近距离
    controls.minDistance = 600
    // 设置相机距离原点的最远距离
    controls.maxDistance = 2000
    // 是否开启右键拖拽
    // controls.enablePan = false;
    // 能够垂直旋转的角度的上限，范围是0到Math.PI，其默认值为Math.PI。
    controls.maxPolarAngle = Math.PI * 0.45

    // 禁止水平旋转
    // controls.maxAzimuthAngle = Math.PI * 0.1
    // controls.minAzimuthAngle = Math.PI * 0.1

    return controls
  }
}
