import * as dat from 'lil-gui'
import type { GUI } from 'lil-gui'

export default class Debug {
  active: boolean
  ui?: GUI

  constructor() {
    this.active = window.location.hash === '#debug'

    if (this.active) {
      this.ui = new dat.GUI()
    }
  }
}
