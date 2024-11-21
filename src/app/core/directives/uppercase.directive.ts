import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[Uppercase]',
})
export class UppercaseDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const textContent = this.el.nativeElement.textContent;
    this.renderer.setProperty(
      this.el.nativeElement,
      'textContent',
      textContent.toUpperCase(),
    );
  }
}