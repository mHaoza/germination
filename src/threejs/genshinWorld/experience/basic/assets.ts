import type { ISource } from './resources'

const assets: ISource[] = [
  // MMD
  {
    name: 'Lumine',
    type: 'mmdModel',
    path: '/mmd/Lumine/荧.pmx',
    animations: [
      {
        name: 'hello',
        path: '/vmd/hello.vmd'
      }
    ]
  }
]

export default assets
