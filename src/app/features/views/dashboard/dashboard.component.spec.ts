import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

import { of } from 'rxjs';
import { SearchBarService } from '../../../core/services/search-bar.service';
import { HeroService } from '../../services/hero.service';
import { TranslateService } from '@ngx-translate/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let searchBarService: jasmine.SpyObj<SearchBarService>;

  beforeEach(() => {
    const mockTranslateService = jasmine.createSpyObj('TranslateService', [
      'instant',
      'get',
      'use',
      'setDefaultLang'
    ]);
    const searchBarSpy = jasmine.createSpyObj('SearchBarService', [
      'searchValue$',
    ]);
    const heroServiceSpy = jasmine.createSpyObj('HeroService', [
      'getAllHeroes',
    ]);
    

    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: SearchBarService, useValue: searchBarSpy },
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    searchBarService = TestBed.inject(
      SearchBarService
    ) as jasmine.SpyObj<SearchBarService>;
  });

  it('should update searchTerm and reset currentPage when searchValue$ emits', () => {
    const mockSearchTerm = 'Superman';
    searchBarService.searchValue$ = of(mockSearchTerm);
    spyOn(component, 'getAllheroes');

    component.getCurrentSearchTerm();

    expect(component.searchTerm).toBe(mockSearchTerm);
    expect(component.currentPage).toBe(1);
    expect(component.getAllheroes).toHaveBeenCalled();
  });

  it('should update currentPage and call getAllheroes', () => {
    spyOn(component, 'getAllheroes');
    const newPage = 2;
    component.onPageChange(newPage);
    expect(component.currentPage).toBe(newPage);
    expect(component.getAllheroes).toHaveBeenCalled();
  });

  it('should update itemsPerPage and call getAllheroes', () => {
    spyOn(component, 'getAllheroes');
    const newPerPage = 20;
    component.onPerPageChange(newPerPage);
    expect(component.itemsPerPage).toBe(newPerPage);
    expect(component.getAllheroes).toHaveBeenCalled();
  });

  it('should update currentViewMode', () => {
    const newViewMode: 'grid' | 'list' = 'grid';
    component.onViewModeChange(newViewMode);
    expect(component.currentViewMode).toBe(newViewMode);
  });
});
