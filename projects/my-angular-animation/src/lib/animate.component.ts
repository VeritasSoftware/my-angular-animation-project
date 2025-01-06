import { AfterViewInit, Component, ElementRef, Input, output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

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
    else
      this._iterationCount = value.toString();
  }
  
  durInSecs = this.durationInSeconds + "s";
  delInSecs = this.delayInSeconds + "s";

  onAnimationTriggered = output<void>();

  @ViewChild('myElement') myElement: ElementRef | undefined;

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
    this.durInSecs = this.durationInSeconds + "s";
    this.delInSecs = this.delayInSeconds + "s";
    this.renderer.setStyle(document.documentElement, `--durationInSeconds`, `${this.durInSecs}`, 2);
    this.renderer.setStyle(document.documentElement, `--iterationCount`, `${this._iterationCount}`, 2);
    this.renderer.setStyle(document.documentElement, `--delayInSeconds`, `${this.delInSecs}`, 2);
  }

  removeAllClasses(myElement: ElementRef<any> | undefined) {
    myElement?.nativeElement.classList.forEach(cls => {
      this.renderer['removeClass'](this.myElement?.nativeElement, cls);
    });
  }

  triggerAnimation() {
    this.trigger();
  }

  private trigger() {
    this.removeAllClasses(this.myElement);
    setTimeout(() => {
      this.renderer['addClass'](this.myElement?.nativeElement, this.animation);
      this.onAnimationTriggered?.emit();
    }, 0);    
  }

  ngAfterViewInit() {
    if (!this.isManualTrigger)
      this.trigger();    
  }
}
