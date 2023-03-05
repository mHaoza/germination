export default class EventEmitter {
  callbacks: {
    [prpo: string]: ((params: any) => void)[]
  }

  constructor() {
    this.callbacks = {}
  }

  on(name: string, callback: () => void) {
    // Errors
    if (typeof name === 'undefined' || name === '') {
      console.warn('wrong names')
      return false
    }

    if (typeof callback === 'undefined') {
      console.warn('wrong callback')
      return false
    }

    // Create callback if not exist
    if (!(this.callbacks[name] instanceof Array)) this.callbacks[name] = []

    // Add callback
    this.callbacks[name].push(callback)

    return this
  }

  off(name: string) {
    // Errors
    if (typeof name === 'undefined' || name === '') {
      console.warn('wrong name')
      return false
    }
    this.callbacks[name] && delete this.callbacks[name]

    return this
  }

  trigger(name: string, ...args: any) {
    // Errors
    if (typeof name === 'undefined' || name === '') {
      console.warn('wrong name')
      return false
    }

    for (const name in this.callbacks) {
      this.callbacks[name].forEach((callback) => {
        callback.call(this, args)
      })
    }
  }
}
