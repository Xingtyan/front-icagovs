import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule, ButtonModule, FormModule } from '@coreui/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, FormModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = ''; password = ''; loading = false; error = '';
  constructor(private auth: AuthService, private router: Router) {}
  submit() {
    this.loading = true; this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/certificates']),
      error: err => { this.loading = false; this.error = err?.error?.message || 'Error al iniciar sesión'; }
    });
  }
}
