import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Importar la interface COMPLETA
import {
  CertificatesService,
  CertificateDetail,
  DogProduct,   // ← Interface COMPLETA
  ApiResponse
} from '../../../services/certificates.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss'],
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom  // 🔑
})
export class CertificateComponent {
  // @Input() certificado!: CertificateDetail;

  constructor(private datePipe: DatePipe,
    private route: ActivatedRoute,
    private certificatesService: CertificatesService,
    private titleService: Title) { }

  certificado!: CertificateDetail;

  ngOnInit() {
    this.titleService.setTitle('Certificado de Inspeccion Sanitaria');
    this.route.paramMap.subscribe(params => {
      const codigo = params.get('codigo');
      if (codigo) {
        this.certificatesService.getCertificateByCode(codigo).subscribe(resp => {
          this.certificado = resp.data!;
        });
      }
    });
  }
  formatDate(date: string | null | undefined): string {
    if (!date) return '';
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return '';
      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObj.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      return '';
    }
  }

  formatNumberLikePHP(value: string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') return '';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '';
    return Math.trunc(num).toString();
  }

  formatPresentacion(producto: DogProduct): string {
    let presentacion = producto.presentacion || '';
    if (producto.code_chip) {
      presentacion += ' - <span style="color: blue; text-decoration: underline;">' + producto.code_chip + '</span>';
    }
    return presentacion || '';
  }
}