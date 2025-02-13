import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';  // ✅ Import HeroComponent

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Standalone Component Mode
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeroComponent]  // ✅ Register HeroComponent here
})
export class AppComponent {
  title = 'My Portfolio';
}