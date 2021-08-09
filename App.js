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
    const sphere = new SphereMesh();
    const camera = new PerspectiveCamera(100, 0.4, 0.01, 1000);

    let cameraInitialPositionX = 0;
    let cameraInitialPositionY = 2;
    let cameraInitialPositionZ = 5;
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
