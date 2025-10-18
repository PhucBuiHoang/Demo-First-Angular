import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../lib/type';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

    register(userData: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/users`, userData);
    }

    login(credentials: { email: string, password: string }): Observable<any> {
        return this.http.get<any[]>(
            `${this.apiUrl}/users?email=${credentials.email}&password=${credentials.password}`
        ).pipe(
            map(users => {
                const user = users[0];
                if (user) {
                    if (isPlatformBrowser(this.platformId)) {
                        localStorage.setItem('currentUser', JSON.stringify({ email: user.email, id: user.id }));
                    }
                    return user;
                }
                return null;
            })
        );
    }

    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('currentUser');
        }
    }

    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return !!localStorage.getItem('currentUser');
        }
        return false;
    }

    getCurrentUser(): { email: string, userName: string } | null {
        if (isPlatformBrowser(this.platformId)) {
            const userData = localStorage.getItem('currentUser');
            if (userData) {
                return JSON.parse(userData);
            }
        }
        return null;
    }
}



// import { Injectable } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { User } from '../lib/type';
// import { HttpClient } from '@angular/common/http';
// @Injectable({ providedIn: 'root' })
// export class AuthService {
//     private apiUrl = 'http://localhost:3000';

//     constructor(private http: HttpClient) { }

//     // User Service
//     register(userData: User): Observable<User> {
//         return this.http.post<User>(`${this.apiUrl}/users`, userData);
//     }

//     login(credentials: { email: string, password: string }): Observable<any> {
//         return this.http.get<any[]>(
//             `${this.apiUrl}/users?email=${credentials.email}&password=${credentials.password}`
//         ).pipe(
//             map(users => {
//                 const user = users[0];
//                 if (user) {
//                     localStorage.setItem('currentUser', JSON.stringify({ email: user.email, id: user.id }));
//                     return user;
//                 }
//                 return null;
//             })
//         );
//     }

//     logout(): void {
//         localStorage.removeItem('currentUser');
//     }

//     isLoggedIn(): boolean {
//         return !!localStorage.getItem('currentUser');
//     }

//     getCurrentUser(): { email: string, userName: string } | null {
//         const userData = localStorage.getItem('currentUser');
//         if (userData) {
//             return JSON.parse(userData);
//         }
//         return null;
//     }
// }
