import { Component } from '@angular/core';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { Hero } from '../../models/HeroI.interface';

@Component({
  selector: 'app-dashboard',
  imports: [HeroBannerComponent, HeroCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent {
  heroes: Hero[] = [
    {
      id: 12,
      name: 'Wolverine',
      images: [
        'https://comicvine.gamespot.com/a/uploads/scale_small/5/57023/7469590-wolverinerb.jpg',
      ],
      bio: 'The man named Logan lives numerous lifetimes as a result of his regenerative mutation before losing his memories during a cruel experiment. But he finds a new home when he joins the ranks of the X-Men as Wolverine. With his brooding demeanor and brawling behavior, he becomes a force of good.',
    },
    {
      id: 23,
      name: 'Rogue',
      images: [
        'https://static.wikia.nocookie.net/marvel-dc/images/2/2b/217758fsKqnCyJ.jpg/revision/latest?cb=20200720091728',
        'https://www.sideshow.com/storage/product-images/500607U/rogue_marvel_feature.jpg',
        'https://ironusa.vtexassets.com/arquivos/ids/213699/070481_1.jpg?v=638508804041100000',
      ],
      bio: 'Without the capacity to control her mutant ability to absorb memories and powers, the young woman known as Rogue walks a dark path. However, Rogue successfully redeems herself as a heroine and becomes a leader among the X-Men and the Avengers.',
    },
    {
      id: 32,
      name: 'Spiderman',
      images: [
        'https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/8126579-amazing_spider-man_vol_5_54_stormbreakers_variant_textless.jpg',
      ],
      bio: 'With spider-like abilities, science genius Peter Parker swings above it all as Spider-Man, costumed champion of the innocent who lives and fights with the wisdom of “With Great Power Comes Great Responsibility!”',
    },
    {
      id: 1,
      name: 'Angular',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg',
      ],
      bio: 'The protector of dynamic web applications, Angular wields the power of two-way data binding and component-based architecture to build scalable, modern front-end solutions.',
    },
    {
      id: 2,
      name: 'React',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
      ],
      bio: 'React, the champion of declarative UI, combines the strength of components and the speed of virtual DOM to create powerful, reactive user experiences.',
    },
    {
      id: 6,
      name: 'TypeScript',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
      ],
      bio: 'TypeScript, the guardian of strong typing, enhances JavaScript with the power of error-catching and robust code structure, ensuring stability in the coding multiverse.',
    },
    {
      id: 7,
      name: 'JavaScript',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
      ],
      bio: 'JavaScript, the pioneer of interactivity, breathes life into the web, enabling dynamic content, animations, and full-stack capabilities.',
    },
  ];
}
