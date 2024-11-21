import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule({
  declarations: [],
  imports: [CommonModule, UppercaseDirective],
  exports: [CommonModule, UppercaseDirective],
})
export class CoreModule {}
