import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { HeroService } from '../../services/hero.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockSnackBarService: jasmine.SpyObj<SnackbarService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    const mockTranslateService = jasmine.createSpyObj('TranslateService', [
      'instant',
      'get',
      'use',
      'setDefaultLang',
    ]);
    mockHeroService = jasmine.createSpyObj('HeroService', ['updateHero']);
    mockSnackBarService = jasmine.createSpyObj('SnackBarService', [
      'openSnackbar',
    ]);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DynamicFormComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: SnackbarService, useValue: mockSnackBarService },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.heroForm = new FormBuilder().group({
      id: [1],
      name: ['Superman', [Validators.required]],
      bio: ['Testing bio', [Validators.required]],
      images: [['Img1', 'img2']],
    });
  });

  it('should update the hero and call snackbar and redirection methods', () => {
    mockHeroService.updateHero.and.returnValue(
      of({
        id: 1,
        name: 'Superman',
        bio: 'Testing bio',
        images: ['Img1', 'img2'],
      })
    );
    spyOn(component, 'redirectToDashboard');
    component.onUpdateHero();

    expect(mockHeroService.updateHero).toHaveBeenCalledWith(1, {
      id: 1,
      name: 'Superman',
      bio: 'Testing bio',
      images: ['Img1', 'img2'],
    });
    expect(mockSnackBarService.openSnackbar).toHaveBeenCalledWith(
      'Hero updated successfully',
      'Ok'
    );
    expect(component.redirectToDashboard).toHaveBeenCalled();
  });
});
