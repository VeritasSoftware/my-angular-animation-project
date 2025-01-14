import { AfterViewInit, Component, ElementRef, Input, output, OutputEmitterRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'animate',
  imports: [],
  templateUrl: './animate.component.html',
  styleUrl: './animate.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AnimateComponent implements AfterViewInit {

  @Input() id: string = "";
  @Input() animation: string = "";
  @Input() durationInSeconds: number = 1;
  @Input() delayInSeconds: number = 0;
  @Input() isManualTrigger: boolean = false;

  _iterationCount: string = "1";

  get iterationCount(): number {
      return parseInt(this._iterationCount)
  }
  @Input() set iterationCount(value: number) {
    if (value <= 0) {
      this._iterationCount = "infinite";
    }
    else if (value != undefined)
      this._iterationCount = parseInt(value.toString()).toString();
    else
      this._iterationCount = "1";
  }

  durInSecs = this.durationInSeconds + "s";
  delInSecs = this.delayInSeconds + "s";

  onAnimationTriggered = output<void>();

  @ViewChild('myAnimationElement') myAnimationElement: ElementRef | undefined;

  static bounce: string = "bounce";
  static bounceIn: string = "bounce-in";
  static fadeIn: string = "fade-in";
  static fadeOut: string = "fade-out";
  static fadeInOut: string = "fade-in-out";
  static fadeOutIn: string = "fade-out-in";
  static flip: string = "flip";
  static shake: string = "shake";
  static swing: string = "swing";
  static slideUp: string = "slide-up";
  static slideDown: string = "slide-down";
  static slideLeft: string = "slide-left";
  static slideRight: string = "slide-right";
  static wobble: string = "wobble";

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {    
    this.setCSSVariables();
  }

  ngAfterViewInit() {
    if (!this.isManualTrigger)
      this.trigger();    
  }

  triggerAnimation() {
    if (this.isManualTrigger)
      this.trigger();
    else
      console.log("Set the isManualTrigger property to true first.");
  }

  triggerAnimationDynamic(settings: AnimateSettings) {
    if (settings.isManualTrigger){
      this.clearAnimateSettings();

      this.setCSSVariables();
  
      this.animation = settings.animation;
      
      if (settings.delayInSeconds != undefined)
        this.delayInSeconds = settings.delayInSeconds;    
      if (settings.durationInSeconds != undefined)
        this.durationInSeconds = settings.durationInSeconds;
      if (settings.isManualTrigger != undefined)
        this.isManualTrigger = settings.isManualTrigger;
      if (settings.iterationCount != undefined)
        this.iterationCount = settings.iterationCount;
  
      this.trigger();
    }      
    else {
      console.log("Set the isManualTrigger property to true first.");
    }      
  }

  private setCSSVariables() {
    this.durInSecs = this.durationInSeconds + "s";
    this.delInSecs = this.delayInSeconds + "s";
    this.renderer.setStyle(document.documentElement, `--durationInSeconds`, `${this.durInSecs}`, 2);
    this.renderer.setStyle(document.documentElement, `--iterationCount`, `${this._iterationCount}`, 2);
    this.renderer.setStyle(document.documentElement, `--delayInSeconds`, `${this.delInSecs}`, 2);
  }

  private clearAnimateSettings() {
    this.animation = "";
    this.delayInSeconds = 0;
    this.durationInSeconds = 1;
    this.isManualTrigger = false;
    this.iterationCount = 1;
    this._iterationCount = "1";
  }

  private removeAllClasses() {
    this.myAnimationElement?.nativeElement.classList.forEach(cls => {
      this.renderer['removeClass'](this.myAnimationElement?.nativeElement, cls);
    });
  }  

  private trigger() {
    this.removeAllClasses();
    setTimeout(() => {
      this.renderer['addClass'](this.myAnimationElement?.nativeElement, this.animation);
      this.onAnimationTriggered?.emit();
    }, 0);    
  }
}

export class AnimateSettings {
  animation: string = "";
  durationInSeconds?: number = 1;
  delayInSeconds?: number = 2;
  isManualTrigger?: boolean = false;
  iterationCount?: number = 1;
}