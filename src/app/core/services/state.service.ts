import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';import { ApiService } from './api.service';
import { User, Todo } from '../../shared/models';

@Injectable({ providedIn: 'root' })
export class StateService {
  // this Code is for State management, it  using BehaviorSubjects to hold app data
  // what this does it that it keeps all data in one place so  components can share it easily
  private usersSubject = new BehaviorSubject<User[]>([]);
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  // Thhis make sure that  observables are exposed so that components can subscribe to state changes
  users$ = this.usersSubject.asObservable();
  todos$ = this.todosSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private api: ApiService) {}

  // It Load data from api and update the state for all components to use
  loadInitialData() {
    this.loadingSubject.next(true);

    combineLatest([this.api.getUsers(), this.api.getTodos()]).subscribe({
      next: ([users, todos]) => {
        this.usersSubject.next(users);
        this.todosSubject.next(todos);
        this.loadingSubject.next(false);
      },
      error: () => {
        this.errorSubject.next('Failed to load data');
        this.loadingSubject.next(false);
      }
    });
  }

  getTodosForUser(userId: number) {
    return this.todos$.pipe(
      map(todos => todos.filter(t => t.userId === userId))
    );
  }

  // This then add new todo to the state so all components see it updated
  addTodo(todo: Omit<Todo, 'id'>) {
    const current = this.todosSubject.value;
    const newTodo: Todo = {
      ...todo,
      id: current.length + 1
    };
    this.todosSubject.next([...current, newTodo]);
  }
}
