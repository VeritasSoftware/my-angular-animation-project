import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimateComponent } from "../../projects/my-angular-animation/src/lib/animate.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-animation';

  //Animation settings
  animateId = "testAnimation";
  animation = AnimateComponent.slideLeft;
  durationInSeconds = 5;
  isManualTrigger = false;

  @ViewChild('searchResultsAnimation') searchResultsAnimation;

  animationTriggered() {
    console.log("Animation Triggered.")
  }

  ngAfterViewInit() {
    
  }

  triggerAnimation() {
    this.searchResultsAnimation.triggerAnimation();
  }
}
