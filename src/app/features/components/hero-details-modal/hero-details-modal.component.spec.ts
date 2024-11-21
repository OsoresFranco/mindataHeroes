import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailsModalComponent } from './hero-details-modal.component';

describe('HeroDetailsModalComponent', () => {
  let component: HeroDetailsModalComponent;
  let fixture: ComponentFixture<HeroDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
