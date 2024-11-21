import {
  Component,
  inject,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../models/HeroI.interface';
import EmblaCarousel from 'embla-carousel';
import { CoreModule } from '../../../core/core.module';

@Component({
  selector: 'app-hero-details-modal',
  imports: [SharedModule, CoreModule],
  templateUrl: './hero-details-modal.component.html',
  styleUrl: './hero-details-modal.component.scss',
})
export class HeroDetailsModalComponent implements OnInit {
  @ViewChild('track', { static: true }) protected track!: ElementRef<any>;
  hero: Hero = inject(MAT_DIALOG_DATA);

  constructor() {
    console.log(this.hero);
  }

  ngOnInit() {
    const options: Partial<any> = {
      loop: true,
      dragFree: false,
    };
    EmblaCarousel(this.track.nativeElement, options);
  }
}
