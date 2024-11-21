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
  @Input() hero: Hero = {
    id: 10,
    name: 'White Tiger',
    bio: 'Ava grew up idolizing her older brother Hector, who had used ancient amulets to become the White Tiger. When she inherits the amulets after his death, Ava takes up the mantle with pride and vows to remain a protector of the people.',
    images: [
      'https://www.themarysue.com/wp-content/uploads/2022/12/white-tiger-mcu-marvel.jpeg?w=1200',
      'https://cdn.marvel.com/u/prod/marvel/i/mg/b/f0/5faac504437fa/standard_incredible.jpg',
      'https://cdnb.artstation.com/p/assets/images/images/032/890/837/large/hasan-ahmed-white-tiger-2c.jpg?1607778948',
    ],
  };
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
    // Stop event propagation
    event.stopPropagation();

    this.router.navigate([`/forms/${this.hero.id}`]);
  }

  onDelete(event: Event): void {
    // Stop event propagation
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
            },
          });
        }
      },
    });
  }
}
