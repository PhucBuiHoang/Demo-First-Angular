import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Demo First Angular');
  loggedUserData = signal<{ email: string, userName: string } | null>(null);
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.loggedUserData.set(this.authService.getCurrentUser());
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logoff() {
    this.authService.logout();
    this.loggedUserData.set(null);
    this.router.navigate(['/login']);
  }
}
