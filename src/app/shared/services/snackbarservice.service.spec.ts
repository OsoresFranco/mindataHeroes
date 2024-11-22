import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        SnackbarService,
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should call MatSnackBar.open() with correct parameters', () => {
    const message = 'Test Message';
    const action = 'Close';
    service.openSnackbar(message, action);
    expect(mockMatSnackBar.open).toHaveBeenCalledWith(message, action);
  });
});
