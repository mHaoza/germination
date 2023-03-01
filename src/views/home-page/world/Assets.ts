interface IAsset {
  name: string
  url: string
}

const gltf: IAsset[] = []
const mmd: IAsset[] = [{ url: '/mmd/Lumine/荧.pmx', name: 'Lumine' }]

export default { gltf, mmd }
