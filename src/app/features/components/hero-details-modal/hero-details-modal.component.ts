import {
  Component,
  inject,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Hero } from '../../models/HeroI.interface';
import EmblaCarousel from 'embla-carousel';
import { CoreModule } from '../../../core/core.module';
import { Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { SnackbarService } from '../../../shared/services/snackbar.service';

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

  constructor(
    private router: Router,
    private heroService: HeroService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService
  ) {
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
    const modalRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: 'Are you sure you want to delete this hero?',
      },
    });
    modalRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.heroService.deleteHero(this.hero.id).subscribe({
            next: () => {
              this.snackBarService.openSnackbar(
                'Hero deleted successfully',
                'Ok'
              );
            },
          });
        }
      },
    });
  }
}
