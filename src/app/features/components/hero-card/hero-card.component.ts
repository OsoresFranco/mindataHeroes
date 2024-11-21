import { Component } from '@angular/core';
import { CoreModule } from '../../../core/core.module';

@Component({
  selector: 'app-hero-card',
  imports: [CoreModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  isHovered: boolean = false;
}
