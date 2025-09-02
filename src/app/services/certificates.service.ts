import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Interface MINIMALISTA para LISTA (solo campos necesarios para la tabla)
export interface Certificate {
  id?: number;
  codigo?: string;
  Numero_Cis?: string;
  puerto_salida?: string;
  pais_destino?: string;
  procedencia?: string;
  // Solo campos esenciales para mostrar en lista
  created_at?: string;
  updated_at?: string;
}

// Interface para PRODUCTOS (compartida)
export interface DogProduct {
  id?: number;
  cantidad?: number;
  unidad?: string;
  producto?: string;
  presentacion?: string;
  code_chip?: string;
  raza?: string;
  empaque?: string;
  sexo?: 'Machos' | 'Hembras';
  edad?: string;
  valor_fob?: number;
  certificado_id?: number;
}

// Interface COMPLETA para DETALLE/VISTA (todos los campos)
export interface CertificateDetail {
  id?: number;
  codigo?: string;
  Numero_Cis?: string;
  puerto_salida?: string;
  pais_destino?: string;
  procedencia?: string;
  ruta_viaje?: string;
  via?: string;
  importador?: string;
  direccion_importador?: string;
  exportador?: string;
  direccion_exportador?: string;
  dictamen?: string;
  observaciones?: string;
  fecha_precuarentena?: string;
  nombre_predio?: string;
  municipio?: string;
  vereda?: string;
  productos?: DogProduct[];
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  success?: boolean;
  message?: string;
  total?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  // private apiUrl = 'http://localhost:8000/api/auth/certificates';
  private apiUrl = `${environment.apiUrl}/certificates`;
  constructor(private http: HttpClient) { }

  // Método para LISTA - Devuelve array de Certificate (minimalista)
  list(search: string = '',  startDate: string = '', endDate: string = '', page: number = 1, per_page: number = 20): Observable<ApiResponse<Certificate[]>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', per_page.toString());
    
    if (search) {
      params = params.set('search', search);
    }

    if (startDate) {
      params = params.set('start_date', startDate);
    }
    
    if (endDate) {
      params = params.set('end_date', endDate);
    }

    return this.http.get<ApiResponse<Certificate[]>>(this.apiUrl, { params });
  }

  // Método para DETALLE por CÓDIGO - Devuelve CertificateDetail (completo)
  getCertificateByCode(code: string): Observable<ApiResponse<CertificateDetail>> {
    return this.http.get<ApiResponse<CertificateDetail>>(`${this.apiUrl}/code/${code}`);
  }

  // Método para DETALLE por ID - Devuelve CertificateDetail (completo)
  get(id: number): Observable<ApiResponse<CertificateDetail>> {
    return this.http.get<ApiResponse<CertificateDetail>>(`${this.apiUrl}/${id}`);
  }

  create(certificate: CertificateDetail): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, certificate);
  }

  update(id: number, certificate: CertificateDetail): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}`, certificate);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}