import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.typeEffect();
  }

  typeEffect() {
    const words = ["Full-Stack Developer", "Engineering Manager", "Tech Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById("typing");

    const type = () => {
      if (typingElement) {
        if (charIndex < words[wordIndex].length) {
          typingElement.innerHTML += words[wordIndex][charIndex];
          charIndex++;
          setTimeout(type, 100);
        } else {
          setTimeout(erase, 2000);
        }
      }
    };

    const erase = () => {
      if (typingElement) {
        if (charIndex > 0) {
          typingElement.innerHTML = words[wordIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, 50);
        } else {
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 500);
        }
      }
    };

    type();
  }
}
