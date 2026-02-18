import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { UserDetailComponent } from './user-detail.component';
import { StateService } from '../../core/services/state.service';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let stateService: jasmine.SpyObj<StateService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: any;

  beforeEach(async () => {
    // Mock services for testing
    const stateServiceSpy = jasmine.createSpyObj('StateService', ['getTodosForUser', 'addTodo']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    activatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
      providers: [
        { provide: StateService, useValue: stateServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();

    stateService = TestBed.inject(StateService) as jasmine.SpyObj<StateService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    stateService.getTodosForUser.and.returnValue(
      of([
        { id: 1, userId: 1, title: 'Test todo', completed: false }
      ])
    );

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos for the user on init', () => {
    fixture.detectChanges();
    expect(component.userId).toBe(1);
    expect(stateService.getTodosForUser).toHaveBeenCalledWith(1);
  });

  it('should get todos from state service', (done) => {
    fixture.detectChanges();
    component.todos$.subscribe(todos => {
      expect(todos.length).toBe(1);
      expect(todos[0].title).toBe('Test todo');
      done();
    });
  });

  it('should add a new todo when form is submitted', () => {
    component.newTitle = 'New todo task';
    component.addTodo();
    
    expect(stateService.addTodo).toHaveBeenCalledWith({
      userId: 1,
      title: 'New todo task',
      completed: false
    });
    expect(component.newTitle).toBe('');
  });

  it('should not add todo if title is empty', () => {
    component.newTitle = '   ';
    component.addTodo();
    
    expect(stateService.addTodo).not.toHaveBeenCalled();
  });

  it('should navigate back to users list', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
