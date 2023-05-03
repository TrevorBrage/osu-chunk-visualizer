import * as THREE from 'three';

const timeStart = Date.now(); 
const ar = 9;

export default function lerp(oldValue: number, oldMin: number, oldMax: number, newMin: number, newMax: number) {
  const oldRange = (oldMax - oldMin)  
  const newRange = (newMax - newMin)  
  const newValue = (((oldValue - oldMin) * newRange) / oldRange) + newMin
  return newValue; 
}

function calculatePreemptTime(ar: number) {
  if (ar < 5) {
    return 1200 + 600 * (5 - ar) / 5;
  } else if (ar > 5) {
    return 1200 - 750 * (ar - 5) / 5;
  } else {
    return 1200;
  }
}

function calculateFadeInTime(ar: number) {
  if (ar < 5) {
    return 800 + 400 * (5 - ar) / 5;
  } else if (ar > 5) {
    return 800 - 500 * (ar - 5) / 5;
  } else {
    return 800;
  }
}

class HitObject {
  geometry: THREE.CircleGeometry;
  material: THREE.MeshBasicMaterial;
  object: THREE.Mesh;
  preempt_start: number;
  fade_in_end: number;
  time: number;

  constructor(time: number, coords: Coords) {
    this.geometry = new THREE.CircleGeometry(1, 64);
    this.material = new THREE.MeshBasicMaterial({color: "#433F81", opacity: 0, transparent: true});
    this.object = new THREE.Mesh(this.geometry, this.material);
    this.object.position.set(coords.x, coords.y, 0);
    this.time = time;
    this.preempt_start = calculatePreemptTime(ar);
    this.fade_in_end = calculateFadeInTime(ar);
  }

  setOpacity(value: number) {
    this.material.opacity = value;
  }

  getObject() {
    return this.object;
  }

  delete() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

function genRandNum(x: number, y: number) {
  return Math.random() * (y - x) + x;
}

// Create an empty scene
const scene = new THREE.Scene();

// Create a basic perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 4;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const objects: HitObject[] = [];

for (let i = 0; i < 100; i++) {
  // Create objects
  const object = new HitObject((i*200)+1000, {x: genRandNum(-2, 2), y: genRandNum(-2, 2)});
  objects.push(object);
  scene.add(object.getObject());
}


const render = () => {
  requestAnimationFrame(render);
  const timeElapsed = Date.now() - timeStart;

  for (const obj of objects) {
    // Show obj if within time bounds
    if (timeElapsed >= obj.time - obj.preempt_start) {
      let newOpacity: number = 0;

      if (timeElapsed < obj.time && timeElapsed > obj.preempt_start)
        newOpacity = Math.max(Math.min(lerp(timeElapsed, obj.time - obj.preempt_start, obj.time - obj.fade_in_end, 0, 0.8), 0.8), 0);
      else if (timeElapsed >= obj.fade_in_end)
        newOpacity = 0.8;

      console.log(newOpacity);

      obj.setOpacity(newOpacity);
    }

    // Delete obj
    if (timeElapsed > obj.time) {
      scene.remove(obj.getObject());
      obj.delete();
    }
  }
  
  renderer.render(scene, camera);
};

render();
document.getElementById('scene-container').appendChild(renderer.domElement);

interface Difficulty {
  circle_size: number
}

interface Coords {
  x: number,
  y: number
}

//const diff: Difficulty = {
//  circle_size: 4
//}
//
//class ApproachCircle {
//  geometry: THREE.CircleGeometry = new THREE.CircleGeometry(1, 64),
//  material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "#433F81" });
//
//  constructor(time: number, coords: Coords, ar: number) {
//
//  }
//}

