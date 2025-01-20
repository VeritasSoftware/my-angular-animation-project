import { Component, OutputEmitterRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimateComponent, AnimateSettings } from "../../projects/my-angular-animation/src/lib/animate.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {provide: OutputEmitterRef<void>, useFactory: () => {
      const output = new(OutputEmitterRef<void>);
      return output;
    }}
  ]
})
export class AppComponent {
  title = 'my-angular-animation';

  //Animation settings
  animateId = "myAnimation";
  animation = AnimateComponent.slideLeft;
  durationInSeconds = 5;
  isManualTrigger = false;

  @ViewChild('searchResultsAnimation') searchResultsAnimation;

  constructor(private onAnimationTriggeredDynamic: OutputEmitterRef<void>) {
    this.onAnimationTriggeredDynamic.subscribe(this.animationTriggeredDynamic);
  }

  animationTriggered() {
    console.log("Animation Triggered.");
  }

  ngAfterViewInit() {
    
  }

  triggerAnimation() {
    this.searchResultsAnimation.triggerAnimation();
  }

  animationTriggeredDynamic() {
    console.log("Animation Triggered Dynamic.");
  }

  runDynamicAnimation() {    
    let settings: AnimateSettings = {
      animation: AnimateComponent.wobble,
      durationInSeconds: 3,
      delayInSeconds: 3,
      iterationCount: 0,
      onAnimationTriggered: this.onAnimationTriggeredDynamic
    };

    this.searchResultsAnimation.triggerAnimationDynamic(settings);
  }
}
