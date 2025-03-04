import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  templateUrl: './three-scene.component.html',
  styleUrls: ['./three-scene.component.scss']
})
export class ThreeSceneComponent implements AfterViewInit {
  @ViewChild('threeCanvas') canvasRef!: ElementRef;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private carModel!: THREE.Object3D; // Holds the loaded 3D car model
  private keyboard: { [key: string]: boolean } = {}; // Stores key states

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.loadCarModel();
    this.animate();
  }

  private initThreeJS() {
    const canvas = this.canvasRef.nativeElement;

    // Setup Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffa726); // Warm orange gradient

    // Setup Camera
    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.camera.position.set(0, 3, 8); // Adjusted position for better view

    // Setup Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    // Add Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    this.scene.add(light);
  }

  private loadCarModel() {
    const loader = new GLTFLoader();
    loader.load('assets/3d/car.glb', (gltf) => {
      this.carModel = gltf.scene;
      this.carModel.scale.set(1.5, 1.5, 1.5); // Adjust size
      this.carModel.position.set(0, 0, 0); // Center the car
      this.scene.add(this.carModel);
    });
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    // Move Car Based on Keyboard Input
    // inspired by https://bruno-simon.com/, https://threejs-journey.com/?c=p1#summary, https://sketchfab.com/store
    if (this.carModel) {
      if (this.keyboard['ArrowUp']) this.carModel.position.z -= 0.1;
      if (this.keyboard['ArrowDown']) this.carModel.position.z += 0.1;
      if (this.keyboard['ArrowLeft']) this.carModel.rotation.y += 0.05;
      if (this.keyboard['ArrowRight']) this.carModel.rotation.y -= 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.keyboard[event.key] = true;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    this.keyboard[event.key] = false;
  }
}
