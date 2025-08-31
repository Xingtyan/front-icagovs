import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

// src/app/services/certificates.service.ts
export interface DogProduct {
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
}
export interface ApiResp<T> {
  data: T;
  message?: string;
  total?: number;
  page?: number;
  per_page?: number;
}

export interface Certificate {
  id?: number;
  codigo: string;
  Numero_Cis?: string;
  puerto_salida?: string;
  pais_destino?: string;
  ruta_viaje?: string;
  procedencia?: string;
  via?: string;
  importador?: string;
  exportador?: string;
  direccion_importador?: string;
  direccion_exportador?: string;
  dictamen?: string;
  observaciones?: string;
  fecha_precuarentena?: string; // 'YYYY-MM-DD'
  nombre_predio?: string;
  municipio?: string;
  vereda?: string;
  created_at?: string;

  productos?: DogProduct[];
}

@Injectable({ providedIn: 'root' })
export class CertificatesService {
  private base = `${environment.apiUrl}/certificates`;
  constructor(private http: HttpClient) { }
  list(search: string, page = 1, per_page = 10) {
    let params = new HttpParams()
      .set('page', page)
      .set('per_page', per_page);
    if (search?.trim()) params = params.set('search', search.trim()); // <- CLAVE

    return this.http.get<{ data: Certificate[]; total: number; page: number; per_page: number }>(
      `${this.base}`, { params }
    );
  }
  // get(id: number) { return this.http.get<Certificate>(`${this.base}/${id}`); }
  get(id: number) {
    return this.http.get<ApiResp<Certificate>>(`${this.base}/${id}`);
  }
  create(data: Certificate) { return this.http.post<ApiResp<Certificate>>(this.base, data); }
  update(id: number, data: Certificate) { return this.http.put<ApiResp<Certificate>>(`${this.base}/${id}`, data); }
  delete(id: number) { return this.http.delete(`${this.base}/${id}`); }
}
