import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models';

@Component({
  standalone: true,
  selector: 'app-users',
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  // This Get the state from StateService using observables and   keep data in one central place, components just read from it
  users$!: Observable<User[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private state: StateService) {
    //it subscribe to state management service
    this.users$ = this.state.users$;
    this.loading$ = this.state.loading$;
    this.error$ = this.state.error$;
  }

  ngOnInit() {
    this.state.loadInitialData();
  }
}
