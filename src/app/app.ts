import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // I used a signal here to make the title reactive, so if i need to update it later it's easy
  protected readonly title = signal('Nzuzos angular-users-todos');
}
