import * as React from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";

import {
  AmbientLight,
  SphereGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
} from "three";

export default class App extends Component {
  render() {
    return <GLView style={{ flex: 1 }} onContextCreate={async (gl) => {}} />;
  }
  _onGLContextCreate = async (gl) => {
    // Here is where we will define our scene, camera and renderer
    // 1. Scene
    var scene = new THREE.Scene();
    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    // 3. Renderer
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    // Define our shape (Below is a tetrahedron, but can be whatever)
    const geometry = new THREE.TetrahedronBufferGeometry(0.1, 0);
    // Define the material, Below is material with hex color #00ff00
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    or;
    // For custom material of any image, simply download any image into your project and use:
    // Define the full 3-D object
    const objectToRender = new THREE.Mesh(geometry, material);
    // Specifying the cameras Z position will allow the object to appear in front of the camera rather that in line (which the camera which is the default)
    camera.position.z = 2;
    scene.add(objectToRender);
  };
}

class SphereMesh extends Mesh {
  constructor() {
    super(
      new SphereGeometry(0, 50, 20, 0, Math.PI * 2, 0, Math.PI * 2),
      new MeshStandardMaterial({
        color: 0xff0000,
      })
    );
  }
}
