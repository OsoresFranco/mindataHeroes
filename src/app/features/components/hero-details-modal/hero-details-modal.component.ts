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
import { Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-details-modal',
  imports: [SharedModule, CoreModule],
  providers: [HeroService],
  templateUrl: './hero-details-modal.component.html',
  styleUrl: './hero-details-modal.component.scss',
})
export class HeroDetailsModalComponent implements OnInit {
  @ViewChild('track', { static: true }) protected track!: ElementRef<any>;
  hero: Hero = inject(MAT_DIALOG_DATA);

  constructor(private router: Router, private heroService: HeroService) {
    console.log(this.hero);
  }

  ngOnInit() {
    const options: Partial<any> = {
      loop: true,
      dragFree: false,
    };
    EmblaCarousel(this.track.nativeElement, options);
  }

  onEdit(): void {
    this.router.navigate([`/forms/${this.hero.id}`]);
  }

  onDelete(): void {
    this.heroService.deleteHero(this.hero.id).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
