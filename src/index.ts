import * as THREE from 'three';

class HitObject {
  geometry: THREE.CircleGeometry;
  material: THREE.MeshBasicMaterial;
  object: THREE.Mesh;

  constructor(time: number, coords: Coords) {
    this.geometry = new THREE.CircleGeometry(1, 64);
    this.material = new THREE.MeshBasicMaterial({ color: "#433F81" });
    this.object = new THREE.Mesh(this.geometry, this.material);
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

// Create an empty scene
const scene = new THREE.Scene();

// Create a basic perspective camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement );

const object = new HitObject(0, {x: 0, y: 0});
scene.add(object.getObject());

const render = () => {
  requestAnimationFrame(render);

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

