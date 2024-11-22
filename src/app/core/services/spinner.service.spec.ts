import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService],
    });
    service = TestBed.inject(SpinnerService);
  });

  it('should emit true when show is called', (done) => {
    service.isLoading$.subscribe((isLoading) => {
      if (isLoading) {
        expect(isLoading).toBeTrue();
        done();
      }
    });

    service.show();
  });

  it('should initialize with false as the default value', (done) => {
    service.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
      done();
    });
  });

  it('should correctly toggle loading states', (done) => {
    const expectedStates = [false, true, false];
    let index = 0;

    service.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(expectedStates[index]);
      index++;
      if (index === expectedStates.length) {
        done();
      }
    });
    service.show();
    service.hide();
  });
});
