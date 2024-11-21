import { Component } from '@angular/core';
import { HeroBannerComponent } from "../../components/hero-banner/hero-banner.component";

@Component({
  selector: 'app-dashboard',
  imports: [HeroBannerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
})
export class DashboardComponent {

}
