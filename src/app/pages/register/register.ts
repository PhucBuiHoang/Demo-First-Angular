import { Component, inject } from '@angular/core';
import { User } from '../../lib/type';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register {
    registerObj: Partial<User> = {};

    authService = inject(AuthService);
    router = inject(Router);

    isLoading: boolean = false;

    onRegister() {
        this.isLoading = true;

        this.registerObj.role = 'user';

        this.authService.register(this.registerObj as User).subscribe({
            next: (res: User) => {
                this.isLoading = false;
                alert(`Registration successful for account: ${res.email || res.username}!`);
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Error when registering:', err);
                alert('Failed to register. Please try again.');
            }
        });
    }
}
