import { Component, OnInit } from '@angular/core';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { Hero } from '../../models/HeroI.interface';
import { HeroService } from '../../services/hero.service';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { SearchBarService } from '../../../core/services/search-bar.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeroBannerComponent,
    HeroCardComponent,
    ToolbarComponent,
    SearchBarComponent,
    PaginatorComponent,
  ],
  providers: [HeroService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsTotal: number = 0;
  currentViewMode: 'grid' | 'list' = 'grid';
  searchTerm: string = '';

  constructor(
    private heroService: HeroService,
    private readonly searchBarService: SearchBarService
  ) {}

  ngOnInit(): void {
    this.getAllheroes();
    this.getCurrentSearchTerm();
  }

  getCurrentSearchTerm(): void {
    this.searchBarService.searchValue$.subscribe((value) => {
      this.searchTerm = value;
      this.currentPage = 1;
      this.getAllheroes();
    });
  }

  getAllheroes(): void {
    this.heroService
      .getAllHeroes(this.currentPage, this.itemsPerPage, this.searchTerm)
      .subscribe({
        next: (res) => {
          this.heroes = res.items;
          this.itemsTotal = res.itemsTotal;
        },
      });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.getAllheroes();
  }

  onPerPageChange(newPerPage: number): void {
    this.itemsPerPage = newPerPage;
    this.getAllheroes();
  }

  onViewModeChange(newViewMode: 'grid' | 'list'): void {
    this.currentViewMode = newViewMode;
  }
}
