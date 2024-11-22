import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../../services/hero.service';
import { TranslateService } from '@ngx-translate/core';
import { HeroDetailsModalComponent } from './hero-details-modal.component';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('HeroDetailsModalComponent', () => {
  let component: HeroDetailsModalComponent;
  let mockRouter: jasmine.SpyObj<Router>;
  let fixture: ComponentFixture<HeroDetailsModalComponent>;

  beforeEach(() => {
    const mockTranslateService = jasmine.createSpyObj('TranslateService', [
      'instant',
      'get',
      'use',
      'setDefaultLang',
    ]);
    const heroServiceSpy = jasmine.createSpyObj('HeroService', [
      'getAllHeroes',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HeroDetailsModalComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: TranslateService, useValue: mockTranslateService },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            hero: {
              id: 42,
              name: 'Superman',
              images: ['img1', 'img2'],
              bio: 'Mock Bio',
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailsModalComponent);
    component = fixture.componentInstance;
    component.hero = {
      id: 42,
      name: 'Superman',
      images: ['img1', 'img2'],
      bio: 'Mock Bio',
    };

    spyOn(component, 'onEdit').and.callThrough();
  });

  it('should navigate to the correct URL when onEdit is called', () => {
    component.onEdit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/forms/42']);
  });
});
