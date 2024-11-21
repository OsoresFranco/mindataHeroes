import { Component, OnInit } from '@angular/core';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { Hero } from '../../models/HeroI.interface';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-dashboard',
  imports: [HeroBannerComponent, HeroCardComponent],
  providers: [HeroService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [{
    "id": 2,
    "name": "Spiderman",
    "bio": "With spider-like abilities, science genius Peter Parker swings above it all as Spider-Man, costumed champion of the innocent who lives and fights with the wisdom of “With Great Power Comes Great Responsibility!”",
    "images": [
        "https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/8126579-amazing_spider-man_vol_5_54_stormbreakers_variant_textless.jpg"
    ]
}];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getAllheroes();
  }

  getAllheroes(): void {
    // this.heroService.getAllHeroes().subscribe({
    //   next: (res: Hero[]) => {
    //     this.heroes = res;
    //   },
    // });
  }
}
