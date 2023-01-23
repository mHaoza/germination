import * as THREE from 'three'

type Resource =
  | THREE.Object3D[]
  | THREE.Object3D
  | THREE.Mesh
  | THREE.BufferGeometry
  | THREE.Material
  | THREE.Texture

export default class ResourceTracker {
  private resources: Set<Resource>

  constructor() {
    this.resources = new Set()
  }
  track(resource: Resource) {
    if (!resource) {
      return resource
    }
    // handle children and when material is an array of materials or
    // uniform is array of textures
    if (Array.isArray(resource)) {
      resource.forEach((resource) => this.track(resource))
      return resource
    }
    if (
      resource instanceof THREE.BufferGeometry ||
      resource instanceof THREE.Object3D
    ) {
      this.resources.add(resource)
    }
    if (resource instanceof THREE.Mesh) {
      this.track(resource.geometry)
      this.track(resource.material)
      this.track(resource.children)
    } else if (resource instanceof THREE.Material) {
      // We have to check if there are any textures on the material
      for (const value of Object.values(resource)) {
        if (value instanceof THREE.Texture) {
          this.track(value)
        }
      }
      // We also have to check if any uniforms reference textures or arrays of textures
      if (resource instanceof THREE.ShaderMaterial) {
        for (const value of Object.values(resource.uniforms)) {
          if (value) {
            const uniformValue = value.value
            if (
              uniformValue instanceof THREE.Texture ||
              Array.isArray(uniformValue)
            ) {
              this.track(uniformValue)
            }
          }
        }
      }
    }
    return resource
  }
  untrack(resource: Resource) {
    this.resources.delete(resource)
  }
  dispose() {
    for (const resource of this.resources) {
      if (resource instanceof THREE.Object3D) {
        if (resource.parent) {
          resource.parent.remove(resource)
        }
      }
      if (
        resource instanceof THREE.BufferGeometry ||
        resource instanceof THREE.Material ||
        resource instanceof THREE.Texture
      ) {
        resource.dispose()
      }
    }
    this.resources.clear()
  }
}
