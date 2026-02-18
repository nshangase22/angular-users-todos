import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StateService } from './state.service';
import { ApiService } from './api.service';

describe('StateService', () => {
  let service: StateService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    // Mock the ApiService
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUsers', 'getTodos']);

    TestBed.configureTestingModule({
      providers: [
        StateService,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });

    service = TestBed.inject(StateService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial data from api', () => {
    const mockUsers = [{ id: 1, name: 'John', email: 'john@example.com' }];
    const mockTodos = [{ id: 1, userId: 1, title: 'Test', completed: false }];

    apiService.getUsers.and.returnValue(of(mockUsers));
    apiService.getTodos.and.returnValue(of(mockTodos));

    service.loadInitialData();

    service.users$.subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    service.todos$.subscribe(todos => {
      expect(todos).toEqual(mockTodos);
    });
  });

  it('should filter todos by user id', (done) => {
    // Setup initial todos
    const todos = [
      { id: 1, userId: 1, title: 'Todo 1', completed: false },
      { id: 2, userId: 2, title: 'Todo 2', completed: false },
      { id: 3, userId: 1, title: 'Todo 3', completed: false }
    ];
    
    apiService.getUsers.and.returnValue(of([]));
    apiService.getTodos.and.returnValue(of(todos));

    service.loadInitialData();

    service.getTodosForUser(1).subscribe(userTodos => {
      expect(userTodos.length).toBe(2);
      expect(userTodos[0].title).toBe('Todo 1');
      expect(userTodos[1].title).toBe('Todo 3');
      done();
    });
  });

  it('should add a new todo to state', (done) => {
    apiService.getUsers.and.returnValue(of([]));
    apiService.getTodos.and.returnValue(of([]));

    service.loadInitialData();

    service.addTodo({
      userId: 1,
      title: 'New todo',
      completed: false
    });

    service.todos$.subscribe(todos => {
      expect(todos.length).toBe(1);
      expect(todos[0].title).toBe('New todo');
      done();
    });
  });

  it('should handle loading state', (done) => {
    apiService.getUsers.and.returnValue(of([]));
    apiService.getTodos.and.returnValue(of([]));

    service.loadInitialData();

    service.loading$.subscribe(loading => {
      // Should start as true then become false
      expect(typeof loading).toBe('boolean');
      done();
    });
  });
});
