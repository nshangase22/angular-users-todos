import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { Observable } from 'rxjs';
import { Todo } from '../../shared/models';

@Component({
  standalone: true,
  selector: 'app-user-detail',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  userId!: number;
  newTitle = '';
  todos$!: Observable<Todo[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService
  ) {}

  goBack() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.todos$ = this.state.getTodosForUser(this.userId);
  }

  addTodo() {
    if (!this.newTitle.trim()) return;

    //I have added a new todo through the state service
    // What this does is that it updates the central state so all parts of the app see it
    this.state.addTodo({
      userId: this.userId,
      title: this.newTitle,
      completed: false
    });

    this.newTitle = '';
  }
}
