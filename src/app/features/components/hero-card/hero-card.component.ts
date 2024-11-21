import { Component, Input } from '@angular/core';
import { CoreModule } from '../../../core/core.module';
import { Hero } from '../../models/HeroI.interface';
import { SharedModule } from '../../../shared/shared.module';
import { Dialog } from '@angular/cdk/dialog';
import { HeroDetailsModalComponent } from '../hero-details-modal/hero-details-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-card',
  imports: [CoreModule, SharedModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  isHovered: boolean = false;
  constructor(private dialog: MatDialog) {}

  selectHero(hero: Hero) {
    this.dialog.open(HeroDetailsModalComponent, {
      data: hero,
    });
  }
}
