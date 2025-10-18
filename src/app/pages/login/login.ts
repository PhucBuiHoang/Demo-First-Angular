import { Component, inject } from '@angular/core';
import { User, LoginModel } from '../../lib/type';
import { Service } from '../../service/service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from '../../constant/constant';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    loginObj: LoginModel = new LoginModel();
    authService = inject(AuthService)
    router = inject(Router);
    isLoading: boolean = false;

    onLogin() {
        if (!this.loginObj.email || !this.loginObj.password) {
            alert('Please enter both email and password.');
            return;
        }

        this.isLoading = true;

        this.authService.login({
            email: this.loginObj.email,
            password: this.loginObj.password
        }).subscribe({
            next: (user: User | null) => {
                this.isLoading = false;
                if (user) {
                    alert('Login successful!');
                    this.router.navigate(['/home']);
                } else {
                    alert('Invalid email or password!');
                }
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Error when logging in:', err);
                alert('Failed to log in. Please try again.');
            }
        });
    }

}
