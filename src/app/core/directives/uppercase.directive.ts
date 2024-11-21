import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[Uppercase]',
})
export class UppercaseDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target.value'])
  onInputChange(value: string): void {
    this.renderer.setProperty(
      this.el.nativeElement,
      'value',
      value.toUpperCase()
    );
  }
}
