import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Todo } from '../../shared/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  //  API endpoint for getting the data
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  // geting all users from the API
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  // Fetch all todos from the API
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`);
  }
}
