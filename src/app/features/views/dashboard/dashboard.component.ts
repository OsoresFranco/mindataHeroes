import { Component, OnInit } from '@angular/core';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { Hero } from '../../models/HeroI.interface';
import { HeroService } from '../../services/hero.service';
import { ToolbarComponent } from "../../../shared/components/toolbar/toolbar.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-dashboard',
  imports: [HeroBannerComponent, HeroCardComponent, ToolbarComponent, SearchBarComponent],
  providers: [HeroService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getAllheroes();
  }

  getAllheroes(): void {
    this.heroService.getAllHeroes().subscribe({
      next: (res: Hero[]) => {
        this.heroes = res;
      },
    });
  }
}
