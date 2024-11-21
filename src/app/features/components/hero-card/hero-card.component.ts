import { Component, Input } from '@angular/core';
import { CoreModule } from '../../../core/core.module';
import { Hero } from '../../models/HeroI.interface';

@Component({
  selector: 'app-hero-card',
  imports: [CoreModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  isHovered: boolean = false;
}
