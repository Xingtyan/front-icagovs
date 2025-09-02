import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// Importar la interface COMPLETA
import {
  CertificatesService,
  CertificateDetail,    // ← Interface COMPLETA
  ApiResponse
} from '../../../services/certificates.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe, DecimalPipe]
})
export class CertificateComponent implements OnInit {
  // Usar la interface COMPLETA
  certificado: CertificateDetail = {};
  productos: any[] = [];
  mensaje: string | null = null;
  isLoading: boolean = true;
  resultado: any = null;

  constructor(
    private route: ActivatedRoute,
    private certificateService: CertificatesService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    this.fixBaseHref();
    const codigo = this.route.snapshot.paramMap.get('id');

    if (codigo) {
      // getCertificateByCode() devuelve CertificateDetail (completo)
      this.certificateService.getCertificateByCode(codigo).subscribe({
        next: (response: ApiResponse<CertificateDetail>) => {
          this.certificado = response.data || {};
          this.productos = this.certificado.productos || [];
          this.resultado = response;
          this.isLoading = false;
        },
        error: (error) => {
          this.mensaje = error.status === 404
            ? `El certificado con número '${codigo}' no existe.`
            : 'Error al cargar el certificado.';
          this.isLoading = false;
        }
      });
    } else {
      this.mensaje = "No se proporcionó un número de certificado.";
      this.isLoading = false;
    }
  }
  
    private fixBaseHref(): void {
    // Corregir el base href para que los recursos se carguen correctamente
    const baseElement = document.querySelector('base');
    if (baseElement) {
      baseElement.setAttribute('href', '/');
    } else {
      const base = document.createElement('base');
      base.setAttribute('href', '/');
      document.head.appendChild(base);
    }
  }

  // SOLUCIÓN: Método para obtener keys de un objeto
  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // SOLUCIÓN: Método para verificar si un objeto tiene propiedades
  hasObjectProperties(obj: any): boolean {
    return obj ? Object.keys(obj).length > 0 : false;
  }

  // SOLUCIÓN: Añadir métodos faltantes
  formatDate(date: string | null | undefined): string {
    if (!date) return 'N/A';
    return this.datePipe.transform(date, 'shortDate') || 'N/A';
  }

  formatNumber(value: string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') return 'N/A';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return this.decimalPipe.transform(num, '1.2-2') || 'N/A';
  }

  recargarPagina(): void {
    window.location.reload();
  }

  imprimirCertificado(): void {
    window.print();
  }

  // SOLUCIÓN: Getter para evitar el optional chaining warning
  get numeroCertificado(): string {
    return this.certificado.Numero_Cis || this.certificado.codigo || 'No encontrado';
  }
}