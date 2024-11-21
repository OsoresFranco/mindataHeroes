import { Component } from '@angular/core';
import { CoreModule } from '../../../core/core.module';
import { SpinnerService } from '../../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  imports: [CoreModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) {}
}
