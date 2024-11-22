import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { CoreModule } from '../../../core/core.module';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

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
      imports: [CoreModule, TranslateModule.forRoot(), PaginatorComponent],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.perPage = 10;
    component.totalItems = 50;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPages correctly', () => {
    component.totalItems = 100;
    component.perPage = 10;
    fixture.detectChanges();
    expect(component.totalPages).toBe(10);
  });

  it('should change page and emit pageChange event', () => {
    spyOn(component.pageChange, 'emit');
    component.totalItems = 50;
    component.perPage = 10;

    component.changePage(3);
    expect(component.page).toBe(3);
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
  });

  it('should not change page if newPage is out of bounds', () => {
    spyOn(component.pageChange, 'emit');
    component.totalItems = 50;
    component.perPage = 10;

    component.changePage(6);
    expect(component.page).toBe(1);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should change items per page and emit events', () => {
    spyOn(component.perPageChange, 'emit');
    spyOn(component.pageChange, 'emit');

    const mockEvent = { target: { value: 20 } };
    component.changePerPage(mockEvent);

    expect(component.perPage).toBe(20);
    expect(component.perPageChange.emit).toHaveBeenCalledWith(20);
    expect(component.page).toBe(1);
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should toggle view mode and emit viewModeChange event', () => {
    spyOn(component.viewModeChange, 'emit');

    component.viewMode = 'grid';
    component.toggleViewMode();
    expect(component.viewMode).toBe('list');
    expect(component.viewModeChange.emit).toHaveBeenCalledWith('list');

    component.toggleViewMode();
    expect(component.viewMode).toBe('grid');
    expect(component.viewModeChange.emit).toHaveBeenCalledWith('grid');
  });
});
