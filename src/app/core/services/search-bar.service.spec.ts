import { TestBed } from '@angular/core/testing';
import { SearchBarService } from './search-bar.service';

describe('SearchBarService', () => {
  let service: SearchBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchBarService],
    });
    service = TestBed.inject(SearchBarService);
  });

  it('should initialize with an empty string as the default search value', (done) => {
    service.searchValue$.subscribe((searchValue) => {
      expect(searchValue).toBe('');
      done();
    });
  });

  it('should update search value when setSearchValue is called', (done) => {
    const newValue = 'Angular Testing';
    service.setSearchValue(newValue);

    service.searchValue$.subscribe((searchValue) => {
      expect(searchValue).toBe(newValue);
      done();
    });
  });

  it('should emit multiple search values in sequence', (done) => {
    const expectedValues = ['', 'Superman', 'Cable'];
    let index = 0;

    service.searchValue$.subscribe((searchValue) => {
      expect(searchValue).toBe(expectedValues[index]);
      index++;

      if (index === expectedValues.length) {
        done();
      }
    });

    service.setSearchValue('Superman');
    service.setSearchValue('Cable');
  });
});
