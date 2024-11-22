import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';
import { CoreModule } from '../../../core/core.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  const mockDialogData = {
    message: 'Are you sure you want to delete this item?',
  };
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CoreModule,
        ConfirmationModalComponent,
        TranslateModule.forRoot(),
      ],
      declarations: [],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly inject the message from MAT_DIALOG_DATA', () => {
    expect(component.message).toBe(mockDialogData.message);
  });

  it('should render the message in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.confirmation-modal__message')?.textContent
    ).toContain(mockDialogData.message);
  });
});
