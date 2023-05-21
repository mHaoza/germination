加载mmd和动画控制

```ts
import * as THREE from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 创建场景、相机、渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建光源
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 50, 50);
directionalLight.castShadow = true;
scene.add(directionalLight);

// 创建控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 加载MMD模型
const loader = new MMDLoader();
loader.loadWithAnimation('model.pmx', 'motion.vmd', (mmd) => {
  mmd.translateY(-1);
  mmd.castShadow = true;
  scene.add(mmd);

  // 播放动画
  const animation = new THREE.AnimationMixer(mmd);
  const action = animation.clipAction(mmd.animations[0]);
  action.play();
});

// 渲染循环
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
```
