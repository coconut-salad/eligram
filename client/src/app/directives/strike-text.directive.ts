import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStrikeText]',
})
export class StrikeTextDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @Input('appStrikeText')
  alignment = 'left';

  ngOnInit(): void {
    console.log();
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', '100%');
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'text-align',
      this.alignment
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'border-bottom',
      '1px solid rgba(150, 150, 150, 0.5)'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'line-height',
      '0.1em'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'margin',
      '10px 0 20px'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement.firstChild,
      'background',
      '#fff'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement.firstChild,
      'padding',
      '0 10px'
    );
  }
}
