// certificate-view.service.ts
import { Injectable, Injector } from '@angular/core';
import { CertificatesService, DogProduct } from './certificates.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CertificateDetail } from './certificates.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CertificateViewService {
    private datePipe: DatePipe;
    private decimalPipe: DecimalPipe;


    constructor(
        private certificateService: CertificatesService,
        private injector: Injector,
        private router: Router  // ← Agrega Router aquí
    ) {
        this.datePipe = this.injector.get(DatePipe);
        this.decimalPipe = this.injector.get(DecimalPipe);
    }

    viewCertificateInNewTab(codigo: string): void {
        const fullUrl = `${window.location.origin}/#/certificado/${codigo}`;
        window.open(fullUrl, '_blank');
    }

    // public generateFullHtml(certificado: CertificateDetail): string {
    //     const baseUrl = window.location.origin;

    //     return `
    // <div class="container" style="position: relative; width: 950px; padding-right: 15px; padding-left: 15px;">
    //     <img src="${baseUrl}/assets/img/fon_cabezoteimg.jpg" alt="SISPAPICA-IMG-HEADER" class="header-image">
    //     <h5 class="text-center" style="font-size:15px !important;font-weight:bold;">
    //         CERTIFICADO DE INSPECCIÓN SANITARIA DE ANIMALES<br>
    //         PRODUCTOS DE ORIGEN ANIMAL Y BIOLÓGICOS
    //     </h5>
    // </div>`;
    // }

//     public generateCertificateContent(certificado: CertificateDetail): string {
//         if (!certificado) {
//             return '<div style="color: red; text-align: center; padding: 20px;">Certificado no encontrado</div>';
//         }

//         return `
// <div id="divInfoCert">
//     <table class="table table-borderless">
//         <tbody>
//             <tr>
//                 <td>
//                     <table style="vertical-align: middle; padding: 8px; line-height: 1.4; vertical-align: top; border-top: 1px solid #ddd;">
//                         <tbody>
//                             <div style="margin-bottom: 5px;"></div>
//                             <tr style="width: 100%; display: table; table-layout: fixed;">
//                                 <th scope="row" style="padding: 10px; width: 120px;">PUERTO SALIDA:</th>
//                                 <td scope="row" style="padding: 10px; width: 300px;">${certificado.puerto_salida || ''}</td>
//                                 <td style="padding: 10px; width: 10%;">&nbsp;</td>
//                                 <th scope="row" style="padding: 10px; width: 10%; word-break: keep-all; word-wrap: normal;">No.</th>
//                                 <td style="padding: 10px; width: 30%; word-break: keep-all; word-wrap: normal;">${certificado.Numero_Cis || ''}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </td>
//             </tr>
            
//             <tr>
//                 <th class="text-center"><span>PRODUCTOS</span></th>
//             </tr>
            
//             <tr>
//                 <td>
//                     ${this.generateProductosTable(certificado.productos || [])}
//                 </td>
//             </tr>
            
//             ${this.generateAdditionalInfo(certificado)}
            
//         </tbody>
//     </table>
//     <br>
// </div>`;
//     }

//     private generateProductosTable(productos: DogProduct[]): string {
//         return `
// <div>
//     <table cellspacing="0" style="width: 100%; border-top: 1px solid #ddd; border-left: 1px solid #4a4a4a; border-bottom: 1px solid #4a4a4a; border-right: 1px solid #4a4a4a;">
//         <tbody>
//             <tr>
//                 <th scope="col" style="border-bottom: 1px solid #ddd; padding: 8px;">Cantidad</th>
//                 <th scope="col" style="border-bottom: 1px solid #ddd; padding: 8px;">Unidad</th>
//                 <th scope="col" style="border-bottom: 1px solid #ddd; padding: 8px;">Producto</th>
//                 <th scope="col" style="border-bottom: 1px solid #ddd; padding: 8px;">Presentación</th>
//                 <th scope="col" style="border-bottom: 1px solid #ddd; padding: 8px;">Raza</th>
//                 <th scope="col" style="border-bottom: 1px solid #ddd; padding: 8px;">Empaque</th>
//                 <th scope="col" style="border-bottom: 1px solid #ddd; padding: 8px;">Sexo</th>
//                 <th scope="col" style="border-bottom: 1px solid #ddd; padding: 8px;">Edad</th>
//                 <th scope="col" style="border-bottom: 1px solid #ddd; padding: 8px;">Valor FOB</th>
//             </tr>
            
//             ${productos.length === 0 ? `
//             <tr>
//                 <td colspan="9" style="padding: 8px; text-align: center;">
//                     No hay productos asociados a este certificado.
//                 </td>
//             </tr>
//             ` : productos.map(producto => `
//             <tr>
//                 <td style="border-bottom: 1px solid #ddd; padding: 8px;">${producto.cantidad || ''}</td>
//                 <td style="border-bottom: 1px solid #ddd; padding: 8px;">${producto.unidad || ''}</td>
//                 <td style="border-bottom: 1px solid #ddd; padding: 8px;">${producto.producto || ''}</td>
//                 <td style="border-bottom: 1px solid #ddd; padding: 8px;">
//                     ${this.formatPresentacion(producto)}
//                 </td>
//                 <td style="border-bottom: 1px solid #ddd; padding: 8px;">${producto.raza || ''}</td>
//                 <td style="border-bottom: 1px solid #ddd; padding: 8px;">${producto.empaque || ''}</td>
//                 <td style="border-bottom: 1px solid #ddd; padding: 8px;">${producto.sexo || ''}</td>
//                 <td style="border-bottom: 1px solid #ddd; padding: 8px;">${producto.edad || ''}</td>
//                 <td style="border-bottom: 1px solid #ddd; padding: 8px;">${this.formatNumberLikePHP(producto.valor_fob)}</td>
//             </tr>
//             `).join('')}
//         </tbody>
//     </table>
// </div>`;
//     }

    // private formatPresentacion(producto: DogProduct): string {
    //     let presentacion = producto.presentacion || '';

    //     if (producto.code_chip) {
    //         presentacion += ' - <span style="color: blue; text-decoration: underline;">' + producto.code_chip + '</span>';
    //     }

    //     return presentacion || '';
    // }

//     private generateAdditionalInfo(certificado: CertificateDetail): string {
//         return `
// <tr>
//     <td>
//         <table class="table">
//             <tbody>
//                 <tr>
//                     <th scope="row">PAIS DE DESTINO:</th>
//                     <th scope="row" colspan="2">PROCEDENCIA</th>
//                 </tr>
//                 <tr>
//                     <td><span id="lbPaisDestino">${certificado.pais_destino || ''}</span></td>
//                     <td colspan="2"><span id="lbProcedencia">${certificado.procedencia || ''}</span></td>
//                 </tr>
                
//                 <tr>
//                     <th scope="row">RUTA DE VIAJE:</th>
//                     <th scope="row" colspan="2">VIA:</th>
//                 </tr>
//                 <tr>
//                     <td><span id="lbRuta">${certificado.ruta_viaje || ''}</span></td>
//                     <td colspan="2"><span id="lbVia">${certificado.via || ''}</span></td>
//                 </tr>
                
//                 <tr>
//                     <th scope="row">IMPORTADOR:</th>
//                     <th scope="row" colspan="2">DIRECCIÓN IMPORTADOR:</th>
//                 </tr>
//                 <tr>
//                     <td><span id="lbImportador">${certificado.importador || ''}</span></td>
//                     <td colspan="2"><span id="lbDireccionImportador">${certificado.direccion_importador || ''}</span></td>
//                 </tr>
                
//                 <tr>
//                     <th scope="row">EXPORTADOR:</th>
//                     <th scope="row" colspan="2">DIRECCIÓN EXPORTADOR:</th>
//                 </tr>
//                 <tr>
//                     <td><span id="lbExportador">${certificado.exportador || ''}</span></td>
//                     <td colspan="2"><span id="lbDireccionExportador">${certificado.direccion_exportador || ''}</span></td>
//                 </tr>
                
//                 <tr>
//                     <th scope="row">DICTAMEN:</th>
//                     <td colspan="2"><span id="lbDictamen">${certificado.dictamen || ''}</span></td>
//                 </tr>
                
//                 <tr>
//                     <th scope="row" colspan="3">OBSERVACIONES:</th>
//                 </tr>
//                 <tr>
//                     <td colspan="3"><span id="lbObservaciones">${certificado.observaciones || ''}</span></td>
//                 </tr>
//             </tbody>
//         </table>
//     </td>
// </tr>

// <tr>
//     <td>
//         <h5 class="text-center" style="font-size:14px !important;font-weight:bold;">UBICACIÓN DE LA PRECUARENTENA</h5>
//         <table class="table">
//             <tbody>
//                 <tr style="text-align:center; font-weight:bold;">
//                     <td>FECHA</td>
//                     <td>NOMBRE PREDIO</td>
//                     <td>MUNICIPIO</td>
//                     <td>VEREDA</td>
//                 </tr>
//                 <tr style="text-align:center;">
//                     <td><span id="lbFechaInspeccion">${this.formatDate(certificado.fecha_precuarentena)}</span></td>
//                     <td><span id="lbPredio">${certificado.nombre_predio || ''}</span></td>
//                     <td><span id="lbMunicipio">${certificado.municipio || ''}</span></td>
//                     <td><span id="lbVereda">${certificado.vereda || ''}</span></td>
//                 </tr>
//             </tbody>
//         </table>
//     </td>
// </tr>`;
//     }

    private formatDate(date: string | null | undefined): string {
        if (!date) return '';

        // Si ya viene en formato YYYY-MM-DD, devolver directamente
        if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return date;
        }

        // Convertir a formato YYYY-MM-DD
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

    private formatNumber(value: string | number | null | undefined): string {
        if (value === null || value === undefined || value === '') return '';
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return this.decimalPipe.transform(num, '1.2-2') || '';
    }

    private formatNumberLikePHP(value: string | number | null | undefined): string {
        if (value === null || value === undefined || value === '') return '';
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(num)) return '';
        return Math.trunc(num).toString(); // Solo parte entera como PHP intval()
    }

    private openHtmlInNewTab(htmlContent: string, fileName: string): void {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');

        // Limpiar URL después de un tiempo
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    }
}