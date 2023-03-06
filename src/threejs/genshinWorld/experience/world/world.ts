import type Experience from '../experience'

export default class World {
  experience
  resources
  constructor(experience: Experience) {
    this.experience = experience
    this.resources = experience.resources

    this.resources.on('loaded', () => {
      this.experience.scene.add(experience.resources.mmd['Lumine'])
    })
  }
}
