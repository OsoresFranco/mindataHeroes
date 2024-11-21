import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseDirective } from './directives/uppercase.directive';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, UppercaseDirective],
  exports: [CommonModule, UppercaseDirective, TranslateModule],
})
export class CoreModule {}
