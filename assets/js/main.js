import * as THREE from 'three';

import { AnaglyphEffect } from 'three/addons/effects/AnaglyphEffect.js';

import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';


let container, camera, scene, renderer, effect;

let model;
let mixer;

let clock = new THREE.Clock();

const spheres = [];

let mouseX = 0;
let mouseY = 0;
let caminar = false;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', onDocumentMouseMove);
document.addEventListener('keydown', (event) => {
    if (event.key === '1') {
        caminar = true;
    }
});

init();

function init() {

    container = document.createElement('div');
    container = document.getElementById('container3D');
    //document.body.appendChild(container);
    

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.z = 2; //3

    const path = 'textures/cube/pisa/';
    const format = '.png';
    const urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];

    const textureCube = new THREE.CubeTextureLoader().load(urls);

    scene = new THREE.Scene();
    scene.background = textureCube;

    // 💡 Luces para que el modelo no se vea oscuro
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);



    const geometry = new THREE.TorusGeometry(0.3, 0.1, 16, 50);
    //const material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube });
const material = new THREE.MeshNormalMaterial();

    for (let i = 0; i < 100; i++) {

        const mesh = new THREE.Mesh(geometry, material);

       mesh.position.x = Math.random() * 20 - 10;
mesh.position.y = Math.random() * 10 - 5;
mesh.position.z = Math.random() * 20 - 10;

        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

        scene.add(mesh);

        spheres.push(mesh);

    }

    const loader = new FBXLoader();



    loader.load('assets/models/Shoved Reaction With Spin.fbx', (object) => {

        model = object;

        // 🔧 Ajustes IMPORTANTES
       model.scale.set(0.02, 0.02, 0.02); // 0.01, 0.01, 0.01
       model.position.set(0, -1, -1.5); //0, -1, 0

        // 👉 Rotarlo un poco para mejorar efecto 3D
        model.rotation.y = Math.PI / 5; //Math.PI / 6;

        scene.add(model);

        // 🎬 Animación (si tiene)
        if (object.animations.length > 0) {
            mixer = new THREE.AnimationMixer(object);
            const action = mixer.clipAction(object.animations[0]);
            action.play();
        }

    });

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    const width = window.innerWidth || 2;
    const height = window.innerHeight || 2;

    effect = new AnaglyphEffect(renderer);
    effect.setSize(width, height);

    // Configure stereo parameters for physically-correct rendering
    // eyeSep: interpupillary distance (default 0.064m / 64mm for humans)
    // planeDistance: distance to the zero-parallax plane (objects here appear at screen depth)
    effect.eyeSep = 0.08; //0.064
    effect.planeDistance = 1.5; // 3

    //

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    effect.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;

}

//

function animate() {

    render();

}

function render() {

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    const timer = 0.0001 * Date.now();

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (- mouseY - camera.position.y) * .05;

    camera.lookAt(scene.position);

    for (let i = 0, il = spheres.length; i < il; i++) {

        const sphere = spheres[i];

        sphere.position.x = 5 * Math.cos(timer + i);
        sphere.position.y = 5 * Math.sin(timer + i * 1.1);

    }
     // 🎮 MOVIMIENTO DEL PERSONAJE
    if (model && caminar) {
    model.position.z += 0.03; // velocidad de avance
}
if (model) {

    const modelPosition = model.position;

    for (let i = 0; i < spheres.length; i++) {

        const dona = spheres[i];

        const distancia = modelPosition.distanceTo(dona.position);

        if (distancia < 1) { // ajusta este valor

            console.log("COLISIÓN!");

            // OPCIÓN 1: detener personaje
            caminar = false;

            // OPCIÓN 2: empujar hacia atrás
            model.position.z -= 0.1;

        }

    }
}
    effect.render(scene, camera);

}
