import { View as GraphicsView } from "expo-graphics";
import ExpoTHREE, { THREE } from "expo-three";
import React from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

export default class App extends React.Component {
  componentDidMount() {
    THREE.suppressExpoWarnings();
  }

  render() {
    // Create an `ExpoGraphics.View` covering the whole screen, tell it to call our
    // `onContextCreate` function once it's initialized.
    return (
      <GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
      />
    );
  }

  // This is called by the `ExpoGraphics.View` once it's initialized
  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor(0xffffff);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.scene.add(new THREE.AmbientLight(0x404040));

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(3, 3, 3);
    this.scene.add(light);

    const name = "eyeball";

    loadMesh("eyeball", function (obj) {
      obj.position.x = 0;
      obj.position.y = 0;
      obj.position.z = 450;
      obj.rotation.x += 1;
      //obj.rotation.y -= 1;
      obj.scale.x = 0.1;
      obj.scale.y = 0.1;
      obj.scale.z = 0.1;
      addMesh(obj);
    });
  };

  onRender = (delta) => {
    this.cube.rotation.x += 2 * delta;
    this.cube.rotation.y += 2 * delta;
    this.renderer.render(this.scene, this.camera);
  };
}

function addMesh(mesh) {
  scene.add(mesh);
  console.log(mesh.getWorldPosition());
}

function loadMesh(name, callback) {
  const objLoader = new OBJLoader();
  const matLoader = new MTLLoader();
  // matLoader.setTexturePath("models/eyeball/");
  matLoader.load(
    "models/eyeball/eyeball.mtl",
    function (materials) {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load(
        "models/eyeball/eyeball.obj",
        function (object) {
          this.scene.add(object);
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function (error) {
          console.log("An error happened - objLoader");
        }
      );
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.log("An error happened - matLoader");
    }
  );
}
