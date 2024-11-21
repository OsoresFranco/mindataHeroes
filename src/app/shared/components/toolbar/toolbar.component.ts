import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreModule } from '../../../core/core.module';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  imports: [CoreModule, FormsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  currentLanguage = localStorage.getItem('lang') ?? 'en';
  supportedLanguages = ['en', 'es'];

  constructor(private translate: TranslateService, private router: Router) {
    this.translate.setDefaultLang(this.currentLanguage);
    this.translate.use(this.currentLanguage);
  }

  switchLanguage(event: any): void {
    this.currentLanguage = event.target?.value;
    this.translate.use(this.currentLanguage);
    localStorage.setItem('lang', this.currentLanguage);
  }

  onAdd() {
    this.router.navigate(['/forms']);
  }
}
