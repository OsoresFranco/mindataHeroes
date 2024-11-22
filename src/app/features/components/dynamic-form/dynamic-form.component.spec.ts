import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { HeroService } from '../../services/hero.service';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockSnackBarService: jasmine.SpyObj<SnackbarService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const mockTranslateService = jasmine.createSpyObj('TranslateService', [
      'instant',
      'get',
      'use',
      'setDefaultLang',
    ]);
    
    mockHeroService = jasmine.createSpyObj('HeroService', [
      'updateHero',
      'createHero',
      'getHeroById'
    ]);
    mockSnackBarService = jasmine.createSpyObj('SnackBarService', [
      'openSnackbar',
    ]);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: () => '1',
        },
      },
    });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DynamicFormComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: SnackbarService, useValue: mockSnackBarService },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
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

  it('should create a hero, show snackbar, and redirect', () => {
    mockHeroService.createHero.and.returnValue(
      of({
        id: 1,
        name: 'Superman',
        bio: 'Testing bio',
        images: ['Img1', 'img2'],
      })
    );

    spyOn(component, 'redirectToDashboard');

    component.onCreateHero();

    expect(mockHeroService.createHero).toHaveBeenCalledWith({
      id: 1,
      name: 'Superman',
      bio: 'Testing bio',
      images: ['Img1', 'img2'],
    });
    expect(mockSnackBarService.openSnackbar).toHaveBeenCalledWith(
      'Hero succesfully created',
      'Ok'
    );
    expect(component.redirectToDashboard).toHaveBeenCalled();
  });

  it('should navigate to the dashboard when redirectToDashboard is called', () => {
    component.redirectToDashboard();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
  });

  it('should mark all fields as touched when form is invalid', () => {
    spyOn(component.heroForm, 'markAllAsTouched');
    component.heroForm.setValue({ id: '', name: '', bio: '', images: [] });
    component.onSubmit();
    expect(component.heroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should initialize the form with the correct controls and validators', () => {
    component.setForm();

    expect(component.heroForm.contains('id')).toBeTrue();
    expect(component.heroForm.contains('name')).toBeTrue();
    expect(component.heroForm.contains('bio')).toBeTrue();
    expect(component.heroForm.contains('images')).toBeTrue();

    const nameControl = component.heroForm.get('name');
    const bioControl = component.heroForm.get('bio');

    nameControl?.setValue('');
    bioControl?.setValue('');
    expect(nameControl?.valid).toBeFalse();
    expect(bioControl?.valid).toBeFalse();

    nameControl?.setValue('Superman');
    bioControl?.setValue('Man of Steel');
    expect(nameControl?.valid).toBeTrue();
    expect(bioControl?.valid).toBeTrue();
  });

  it('should initialize the "images" control as an empty FormArray', () => {
    component.setForm();
    const imagesControl = component.heroForm.get('images');
    expect(imagesControl).toBeInstanceOf(FormArray);
    expect((imagesControl as FormArray).length).toBe(0);
  });

  it('should remove the picture at the specified index', () => {
    component.heroForm = new FormBuilder().group({
      id: [1],
      name: ['Superman', [Validators.required]],
      bio: ['Testing bio', [Validators.required]],
      images: new FormArray([
        new FormBuilder().control('img1.jpg'),
        new FormBuilder().control('img2.jpg'),
        new FormBuilder().control('img3.jpg'),
      ]),
    });
    const imagesControl = component.heroForm.get('images') as FormArray;
  
    expect(imagesControl.length).toBe(3);
  
    component.removePicture(1);
  
    expect(imagesControl.length).toBe(2);
    expect(imagesControl.at(0).value).toBe('img1.jpg');
    expect(imagesControl.at(1).value).toBe('img3.jpg');
  });

  it('should add a picture control to the FormArray if length is less than 5', () => {
    component.heroForm = new FormBuilder().group({
      id: [1],
      name: ['Superman', [Validators.required]],
      bio: ['Testing bio', [Validators.required]],
      images: new FormArray([]),
    });
    component.addPicture();
    component.addPicture();
    component.addPicture();
    const imagesControl = component.heroForm.get('images') as FormArray;
    expect(imagesControl.length).toBe(3);
  });
  
  it('should not add a picture control if FormArray length is 5 or more', () => {
    component.heroForm = new FormBuilder().group({
      id: [1],
      name: ['Superman', [Validators.required]],
      bio: ['Testing bio', [Validators.required]],
      images: new FormArray([
        new FormBuilder().control('img1.jpg', Validators.required),
        new FormBuilder().control('img2.jpg', Validators.required),
        new FormBuilder().control('img3.jpg', Validators.required),
        new FormBuilder().control('img4.jpg', Validators.required),
        new FormBuilder().control('img5.jpg', Validators.required),
      ]),
    });
    component.addPicture();
    const imagesControl = component.heroForm.get('images') as FormArray;
    expect(imagesControl.length).toBe(5);
  });

  it('should return the FormArray of images from the form', () => {
    component.heroForm = new FormBuilder().group({
      id: [1],
      name: ['Superman', [Validators.required]],
      bio: ['Testing bio', [Validators.required]],
      images: new FormArray([
        new FormBuilder().control('img1.jpg', Validators.required),
        new FormBuilder().control('img2.jpg', Validators.required),
      ]),
    });
    const imagesControl = component.pictures;

    expect(imagesControl).toBeInstanceOf(FormArray);
    expect(imagesControl.length).toBe(2);
    expect(imagesControl.at(0).value).toBe('img1.jpg');
    expect(imagesControl.at(1).value).toBe('img2.jpg');
  });

  it('should initialize form with hero data if ID is present', () => {
    const mockHero = {
      id: 1,
      name: 'Superman',
      bio: 'Man of Steel',
      images: [],
    };
    
  
    mockHeroService.getHeroById.and.returnValue(of(mockHero));

    component.formHasValue();

    expect(component.heroForm.get('id')?.value).toBe(1);
    expect(component.heroForm.get('name')?.value).toBe('Superman');
    expect(component.heroForm.get('bio')?.value).toBe('Man of Steel');
    expect(component.isEditing).toBeTrue();
  });
});
