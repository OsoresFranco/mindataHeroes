import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from '../../../core/services/spinner.service';
import { CoreModule } from '../../../core/core.module';
import { of } from 'rxjs';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let mockSpinnerService: jasmine.SpyObj<SpinnerService>;

  beforeEach(() => {
    mockSpinnerService = jasmine.createSpyObj('SpinnerService', [], {
      isLoading$: of(false),
    });

    TestBed.configureTestingModule({
      imports: [CoreModule, SpinnerComponent],
      providers: [{ provide: SpinnerService, useValue: mockSpinnerService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have SpinnerService injected', () => {
    expect(component.spinnerService).toBe(mockSpinnerService);
  });

  it('should show or hide spinner based on the service value', () => {
    mockSpinnerService.isLoading$ = of(false);
    fixture.detectChanges();
    let spinnerElement = fixture.nativeElement.querySelector('.spinner');
    expect(spinnerElement).toBeNull();
  });
});
