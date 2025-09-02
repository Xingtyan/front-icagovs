// certificate-search.component.ts
import { Component } from '@angular/core';
import { CertificateViewService } from '../../../services/certificate-view.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificate-search',
  templateUrl: './certificate-search.component.html',
  imports: [CommonModule, FormsModule]
})
export class CertificateSearchComponent {
  codigo: string = '';
  isLoading: boolean = false;

  constructor(private certificateViewService: CertificateViewService,
    private router: Router) { }

  buscarCertificado(): void {
    if (!this.codigo.trim()) {
      alert('Por favor ingrese un código de certificado');
      return;
    }

    this.isLoading = true;
    const codigoLimpio = this.codigo.trim();
    
    this.certificateViewService.viewCertificateInNewTab(codigoLimpio);
    
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
  
  irALogin(): void {
    this.router.navigate(['/login']);
  }
}