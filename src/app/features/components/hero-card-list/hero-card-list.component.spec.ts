import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardListComponent } from './hero-card-list.component';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';

describe('HeroCardListComponent', () => {
  let component: HeroCardListComponent;
  let fixture: ComponentFixture<HeroCardListComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let router: Router;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockSnackBarService: jasmine.SpyObj<SnackbarService>;
  const translateService = jasmine.createSpyObj<TranslateService>(
    'TranslateService',
    ['instant', 'get', 'use', 'setDefaultLang']
  );
  const translateServiceMock = {
    ...translateService,
    currentLang: 'en',
    onLangChange: new EventEmitter(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
    get: translateService.get.and.returnValue(of('')),
  };

  const mockHero = {
    id: 1,
    name: 'Superman',
    bio: 'Man of Steel',
    images: ['image1.jpg'],
  };

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockHeroService = jasmine.createSpyObj('HeroService', [
      'deleteHero',
      'updateEmitter',
    ]);
    mockSnackBarService = jasmine.createSpyObj('SnackbarService', [
      'openSnackbar',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        HeroCardListComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: HeroService, useValue: mockHeroService },
        { provide: SnackbarService, useValue: mockSnackBarService },
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCardListComponent);
    component = fixture.componentInstance;
    component.hero = mockHero;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the correct URL when onEdit is called', () => {
    spyOn(router, 'navigate');
    const mockEvent = new Event('click');

    component.onEdit(mockEvent);

    expect(router.navigate).toHaveBeenCalledWith(['/forms/1']);
  });
});
