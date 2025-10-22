import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { AuthService } from './service/service.auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Demo First Angular');
  loggedUserData = signal<{ email: string, id: string, role: string } | null>(null);
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

  isUserAdmin(): boolean {
    return this.authService.isAuthorized(['admin']);
  }
}
