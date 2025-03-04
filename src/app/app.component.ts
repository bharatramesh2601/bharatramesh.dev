import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';  // ✅ Import HeroComponent
import { HeaderComponent } from './components/header/header.component';  // ✅ Import HeaderComponent
import { ThreeSceneComponent } from './components/three-scene/three-scene.component';  // ✅ Import HeaderComponent

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Standalone Component Mode
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, HeroComponent, ThreeSceneComponent]  // ✅ Register HeroComponent here
})
export class AppComponent {
  title = 'My Portfolio';
}