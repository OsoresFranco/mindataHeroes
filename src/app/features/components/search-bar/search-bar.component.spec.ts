import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarService } from '../../../core/services/search-bar.service';
import { HeroService } from '../../services/hero.service';
import { TranslateService } from '@ngx-translate/core';
import { SearchBarComponent } from './search-bar.component';
import {  Subscription } from 'rxjs';


describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let searchBarService: jasmine.SpyObj<SearchBarService>;

  beforeEach(() => {
    const mockTranslateService = jasmine.createSpyObj('TranslateService', [
      'instant',
      'get',
      'use',
      'setDefaultLang',
    ]);

    const searchBarSpy = jasmine.createSpyObj('SearchBarService', [
      'searchValue$',
      'setSearchValue',
    ]);
    const heroServiceSpy = jasmine.createSpyObj('HeroService', [
      'getAllHeroes',
    ]);

    TestBed.configureTestingModule({
      imports: [SearchBarComponent],
      providers: [
        { provide: SearchBarService, useValue: searchBarSpy },
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    searchBarService = TestBed.inject(
      SearchBarService
    ) as jasmine.SpyObj<SearchBarService>;
    component['searchTermSub$'] = new Subscription();
    spyOn(component['searchTermSub$'], 'unsubscribe');
    spyOn(component, 'setSearchTerm').and.callThrough();
  });

  it('should call setSearchValue in SearchBarService with the provided search term', () => {
    const mockSearchTerm = 'Superman';
    component.setSearchTerm(mockSearchTerm);

    expect(searchBarService.setSearchValue).toHaveBeenCalledWith(
      mockSearchTerm
    );
    expect(searchBarService.setSearchValue).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe searchTermSub$ on ngOnDestroy', () => {
    component.ngOnDestroy();

    expect(component['searchTermSub$'].unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('should call SearchBarService.setSearchValue when searchControl.valueChanges emits', (done) => {
    const mockTerm = 'Superman';
    component.ngOnInit();
    component.searchControl.setValue(mockTerm);
    setTimeout(() => {
      expect(component.setSearchTerm).toHaveBeenCalledWith(mockTerm);
      expect(searchBarService.setSearchValue).toHaveBeenCalledWith(mockTerm);
      expect(searchBarService.setSearchValue).toHaveBeenCalledTimes(1);
      done();
    }, 600);
  });
});
