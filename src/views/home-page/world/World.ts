import Basic from './Basic.js'
import Sizes from '@/utils/Size.js'
import ResourceTracker from '@/utils/ResourceTracker.js'
import { Resources } from './Resources.js'

interface IWorldOptions {
  dom: HTMLElement
}

export default class World {
  private basic
  private scene
  private camera
  private renderer
  private controls
  private sizes
  private resMgr
  private resources

  private animationID: number | undefined

  constructor(options: IWorldOptions) {
    // threejs基本套件
    this.basic = new Basic({ dom: options.dom })
    this.scene = this.basic.scene
    this.camera = this.basic.camera
    this.renderer = this.basic.renderer
    this.controls = this.basic.controls

    // Sizes实例，用于监听窗口变化
    this.sizes = new Sizes({ dom: options.dom })
    // 资源管理实例，用于统一管理各资源内存，用于离开页面统一清除内存
    this.resMgr = new ResourceTracker()
    // ResourceTracker实例的track方法，用于创建需要添加到scene的元素时管理该元素内存
    // this.track = this.resMgr.track.bind(this.resMgr)

    // 监听窗口大小改变
    this.sizes.onResize('resizeRender', () => {
      const width = Number(this.sizes.viewport.width)
      const height = Number(this.sizes.viewport.height)

      this.renderer.setSize(width, height)
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
    })

    // 资源加载实例，传入一个资源加载完成的回调
    this.resources = new Resources(() => {})

    this.render()
  }

  // 渲染函数
  render() {
    this.animationID = requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
    this.controls && this.controls.update()
  }

  // 清除场景资源
  clearScene() {
    try {
      this.sizes.clear()
      this.scene.clear()
      this.resMgr.dispose()
      this.renderer.dispose()
      this.renderer.forceContextLoss()
      this.animationID && cancelAnimationFrame(this.animationID)
      const gl = this.renderer.domElement.getContext('webgl')
      gl && gl.getExtension('WEBGL_lose_context')?.loseContext()
      console.log(this.renderer.info) //查看memery字段即可
    } catch (e) {
      console.log(e)
    }
  }
}
