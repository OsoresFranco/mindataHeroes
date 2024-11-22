import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreModule } from '../../../core/core.module';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let router: Router;

  beforeEach(() => {
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

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CoreModule,
        ToolbarComponent,
        TranslateModule.forRoot(),
      ],
      declarations: [],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /forms when onAdd is called', () => {
    spyOn(router, 'navigate');
    component.onAdd();
    expect(router.navigate).toHaveBeenCalledWith(['/forms']);
  });
});
