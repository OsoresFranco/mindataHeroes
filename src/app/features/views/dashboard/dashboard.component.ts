import { Component } from '@angular/core';
import { HeroBannerComponent } from "../../components/hero-banner/hero-banner.component";
import { HeroCardComponent } from "../../components/hero-card/hero-card.component";

@Component({
  selector: 'app-dashboard',
  imports: [HeroBannerComponent, HeroCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent {

}
