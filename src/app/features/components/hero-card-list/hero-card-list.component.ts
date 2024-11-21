import { Component, Input } from '@angular/core';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';
import { Hero } from '../../models/HeroI.interface';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailsModalComponent } from '../hero-details-modal/hero-details-modal.component';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-hero-card-list',
  imports: [CoreModule, SharedModule],
  templateUrl: './hero-card-list.component.html',
  styleUrl: './hero-card-list.component.scss',
})
export class HeroCardListComponent {
  @Input() hero!: Hero;
  isHovered: boolean = false;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private heroService: HeroService,
    private snackBarService: SnackbarService
  ) {}

  selectHero(hero: Hero): void {
    this.dialog.open(HeroDetailsModalComponent, {
      data: hero,
    });
  }

  onEdit(event: Event): void {
    event.stopPropagation();

    this.router.navigate([`/forms/${this.hero.id}`]);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
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
              this.heroService.updateEmitter();
            },
          });
        }
      },
    });
  }
}
