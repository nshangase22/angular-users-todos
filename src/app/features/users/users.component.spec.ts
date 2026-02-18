import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UsersComponent } from './users.component';
import { StateService } from '../../core/services/state.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let stateService: jasmine.SpyObj<StateService>;

  beforeEach(async () => {
    // Create a mock StateService for testing
    const stateServiceSpy = jasmine.createSpyObj('StateService', ['loadInitialData'], {
      users$: of([
        { id: 1, name: 'Nzuzo', email: 'nzuzotest@test.com' },
        { id: 2, name: 'Hope', email: 'nzuzotest2@test.com' }
      ]),
      loading$: of(false),
      error$: of(null)
    });

    await TestBed.configureTestingModule({
      imports: [UsersComponent, RouterTestingModule],
      providers: [{ provide: StateService, useValue: stateServiceSpy }]
    }).compileComponents();

    stateService = TestBed.inject(StateService) as jasmine.SpyObj<StateService>;
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data when component initializes', () => {
    fixture.detectChanges();
    expect(stateService.loadInitialData).toHaveBeenCalled();
  });

  it('should display users from state service', (done) => {
    fixture.detectChanges();
    component.users$.subscribe(users => {
      expect(users.length).toBe(2);
      expect(users[0].name).toBe('John');
      done();
    });
  });

  it('should have loading and error observables from state', () => {
    fixture.detectChanges();
    expect(component.loading$).toBeDefined();
    expect(component.error$).toBeDefined();
  });
});
