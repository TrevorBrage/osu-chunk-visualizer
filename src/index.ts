import * as THREE from 'three';

let time = 0; 

class HitObject {
  geometry: THREE.CircleGeometry;
  material: THREE.MeshBasicMaterial;
  object: THREE.Mesh;
  time: number;

  constructor(time: number, coords: Coords) {
    this.geometry = new THREE.CircleGeometry(1, 64);
    this.material = new THREE.MeshBasicMaterial({ color: "#433F81" });
    this.object = new THREE.Mesh(this.geometry, this.material);
    this.object.position.set(coords.x, coords.y, 0);
    this.time = time;
  }

  updateTime(time: number) {

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
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const objects: HitObject[] = [];

for (let i = 0; i < 10; i++) {
  // Create objects
  const object = new HitObject(i*20, {x: genRandNum(-1, 1), y: genRandNum(-1, 1)});
  objects.push(object);
}


// Render objects
for (const obj of objects)
  scene.add(obj.getObject());

const render = () => {
  requestAnimationFrame(render);
  ++time;

  // Remove and delete if time > object's local time
  for (const obj of objects) {
    if (time > obj.time + 100) {
      scene.remove(obj.getObject());
      obj.delete();
    }
  }

  console.log(time);
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

