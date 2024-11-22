import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { HeroCardComponent } from './hero-card.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { HeroService } from '../../services/hero.service';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

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

    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [HeroCardComponent],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: MatDialog, useValue: mockDialog },
        HttpClient,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
  });
  
  it('should exist', () => {
    expect(component).toBeTruthy();
  });
});
