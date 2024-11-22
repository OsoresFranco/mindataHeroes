import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UppercaseDirective } from './uppercase.directive';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [UppercaseDirective],
  template: `<input type="text" Uppercase />`,
})
class TestComponent {}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should convert input value to uppercase', () => {
    const inputDebugElement = fixture.debugElement.query(
      By.directive(UppercaseDirective)
    );
    expect(inputDebugElement).not.toBeNull();
    const inputElement = inputDebugElement.nativeElement;

    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('TEST');
  });

  it('should handle mixed-case input and convert it to uppercase', () => {
    const inputDebugElement = fixture.debugElement.query(
      By.directive(UppercaseDirective)
    );
    expect(inputDebugElement).not.toBeNull();
    const inputElement = inputDebugElement.nativeElement;
    inputElement.value = 'TeSt123';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputElement.value).toBe('TEST123');
  });

  it('should handle numbers and special characters', () => {
    const inputDebugElement = fixture.debugElement.query(
      By.directive(UppercaseDirective)
    );
    expect(inputDebugElement).not.toBeNull();
    const inputElement = inputDebugElement.nativeElement;

    inputElement.value = '123abc$%!';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputElement.value).toBe('123ABC$%!');
  });
});
