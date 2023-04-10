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
  },
  {
    name: 'Amber',
    type: 'mmdModel',
    path: '/mmd/Amber/安柏.pmx',
    animations: [
      {
        name: 'hello',
        path: '/vmd/hello.vmd'
      }
    ]
  },
  {
    name: 'Xiangling',
    type: 'mmdModel',
    path: '/mmd/Xiangling/香菱.pmx',
    animations: [
      {
        name: 'hello',
        path: '/vmd/hello.vmd'
      }
    ]
  }
]

export default assets
