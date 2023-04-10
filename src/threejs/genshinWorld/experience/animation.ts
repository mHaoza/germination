import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'

export default class Animation {
  mmdHelper = new MMDAnimationHelper()

  constructor() {}

  update(delta: number) {
    this.mmdHelper.update(delta)
  }
}
