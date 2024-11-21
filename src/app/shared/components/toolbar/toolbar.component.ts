import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreModule } from '../../../core/core.module';

@Component({
  selector: 'app-toolbar',
  imports: [CoreModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  constructor(private router: Router) {}

  onAdd() {
    this.router.navigate(['/forms']);
  }
}
