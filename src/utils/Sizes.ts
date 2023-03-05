import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
  width
  height
  pixelRatio
  constructor() {
    super()

    // Setup
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Resize event
    window.addEventListener('resize', () => {
      this.resize()
    })

    //Orientation change event
    window.onorientationchange = async () => {
      await this.sleep(10)
      this.resize()
    }

    //Screen wake event
    document.addEventListener('visibilitychange', async () => {
      if (document.hidden) return

      await this.sleep(500)
      this.resize()
    })
  }

  //manual trigger
  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.trigger('resize')
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
