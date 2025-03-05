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
  private frontLeftWheel!: THREE.Object3D;
  private frontRightWheel!: THREE.Object3D;
  private backLeftWheel!: THREE.Object3D;
  private backRightWheel!: THREE.Object3D;

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.loadCarModel();
    this.animate();
  }

  // Move Car Based on Keyboard Input
  // inspired by https://bruno-simon.com/, https://threejs-journey.com/?c=p1#summary, https://sketchfab.com/store
  private initThreeJS() {
    const canvas = this.canvasRef.nativeElement;

    // Setup Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffa726); // Warm orange gradient

    // Setup Camera
    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.camera.position.set(0, 5, 10); // Adjusted for a better view

    // Setup Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    // Add Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    this.scene.add(light);

    // ✅ Add Ground Plane (Grass/Asphalt Surface)
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const ground = new THREE.Mesh(planeGeometry, planeMaterial);
    ground.rotation.x = -Math.PI / 2; // ✅ Rotate to lie flat on the ground
    this.scene.add(ground);
  }

  private loadCarModel() {
    const loader = new GLTFLoader();
    loader.load('assets/3d/car.glb', (gltf) => {
      this.carModel = gltf.scene;
      this.carModel.scale.set(1.5, 1.5, 1.5); // Adjust size
      this.carModel.position.set(0, 0, 0); // Center the car

    // ✅ Store Wheels if Named in the Model
    this.frontLeftWheel = this.carModel.getObjectByName('FrontLeftWheel')!;
    this.frontRightWheel = this.carModel.getObjectByName('FrontRightWheel')!;
    this.backLeftWheel = this.carModel.getObjectByName('BackLeftWheel')!;
    this.backRightWheel = this.carModel.getObjectByName('BackRightWheel')!;

      this.scene.add(this.carModel);
    });
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
  
    if (this.carModel) {

      const speed = .5;
      const rotationSpeed = 0.05;
      
      // Get the car's forward direction based on rotation
      const direction = new THREE.Vector3();
      this.carModel.getWorldDirection(direction);

      // Move forward and backward based on the car's facing direction
      if (this.keyboard['ArrowUp']) {
        this.carModel.position.addScaledVector(direction, speed);
    
        // Rotate Wheels Forward
        if (this.frontLeftWheel) this.frontLeftWheel.rotation.x -= speed;
        if (this.frontRightWheel) this.frontRightWheel.rotation.x -= speed;
        if (this.backLeftWheel) this.backLeftWheel.rotation.x -= speed;
        if (this.backRightWheel) this.backRightWheel.rotation.x -= speed;
      }
      if (this.keyboard['ArrowDown']) {
        this.carModel.position.addScaledVector(direction, -speed);
    
        // Rotate Wheels Backward
        if (this.frontLeftWheel) this.frontLeftWheel.rotation.x += speed;
        if (this.frontRightWheel) this.frontRightWheel.rotation.x += speed;
        if (this.backLeftWheel) this.backLeftWheel.rotation.x += speed;
        if (this.backRightWheel) this.backRightWheel.rotation.x += speed;
      }

      // Rotate the car (Left/Right Arrow Keys)
      if (this.keyboard['ArrowLeft']) {
        this.carModel.rotation.y += rotationSpeed;
      }
      if (this.keyboard['ArrowRight']) {
        this.carModel.rotation.y -= rotationSpeed;
      }
  
      // Make Camera Follow the Car from Behind
      // this.camera.position.set(
      //   this.carModel.position.x - direction.x * 5,
      //   this.carModel.position.y + 2,
      //   this.carModel.position.z - direction.z * 5
      // );
      this.camera.lookAt(this.carModel.position);
    }
  
    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    event.preventDefault(); // Prevents arrow keys from scrolling the page
    this.keyboard[event.key] = true;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    event.preventDefault();
    this.keyboard[event.key] = false;
  }
}
