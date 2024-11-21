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
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-details-modal',
  imports: [SharedModule, CoreModule],
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
    private snackBarService: SnackbarService,
    private translateService: TranslateService
  ) {}

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
        message: this.translateService.instant(
          'ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_HERO'
        ),
      },
    });

    modalRef.afterClosed().subscribe((res) => {
      if (res) {
        this.heroService.deleteHero(this.hero.id).subscribe({
          next: () => {
            this.snackBarService.openSnackbar(
              this.translateService.instant('HERO_DELETED_SUCCESSFULY'),
              'Ok'
            );
            this.heroService.updateEmitter();
          },
        });
      }
    });
  }
}
