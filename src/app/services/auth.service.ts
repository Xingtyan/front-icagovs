import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.base}/login`, { email, password })
      .pipe(tap(res => {
        if (res?.access_token) localStorage.setItem('jwt', res.access_token);
      }));
  }

  logout() {
    const token = this.getToken();
    localStorage.removeItem('jwt');
    return this.http.post(`${this.base}/logout`, {}, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  }

  getToken(): string | null { return localStorage.getItem('jwt'); }
  isLoggedIn(): boolean { return !!this.getToken(); }
}
