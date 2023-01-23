interface ISizesOptions {
  dom: HTMLElement
}

interface ResizeFuns {
  [prop: string]: () => void
}

export default class Sizes {
  private $sizeViewport: HTMLElement
  viewport: { width: number; height: number }
  resizeFuns: ResizeFuns

  constructor(options: ISizesOptions) {
    // Viewport size
    this.$sizeViewport = options.dom

    this.viewport = { width: 0, height: 0 }

    this.resizeFuns = {}

    // Resize event
    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)

    this.resize()
  }

  onResize = (key: string, fun: () => void) => {
    this.resizeFuns[key] = fun
  }

  offResize = (key: string) => {
    delete this.resizeFuns[key]
  }

  resize() {
    // 可视区域大小
    this.viewport.width = this.$sizeViewport.offsetWidth
    this.viewport.height = this.$sizeViewport.offsetHeight

    // 遍历调用所有Resize后需要调用的方法
    for (const key in this.resizeFuns) {
      this.resizeFuns[key]()
    }
  }

  clear() {
    window.removeEventListener('resize', this.resize)
  }
}
