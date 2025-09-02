import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../../services/dialog.service';

import {
  CardModule, ButtonModule, TableModule, ModalModule,
  SpinnerModule, FormModule
} from '@coreui/angular';

// Importar interfaces SEPARADAS
import { 
  CertificatesService, 
  Certificate,           // ← Interface MINIMALISTA para lista
  CertificateDetail,    // ← Interface COMPLETA para formulario
  DogProduct 
} from '../../../services/certificates.service';

@Component({
  selector: 'app-certificates-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    CardModule, ButtonModule, TableModule, ModalModule, SpinnerModule, FormModule
  ],
  templateUrl: './certificates-list.component.html',
  styleUrls: ['./certificates-list.component.scss']
})
export class CertificatesListComponent implements OnInit {
  search = '';
  loading = false;
  saving = false;

  page = 1; 
  per_page = 20; 
  total = 0;
  rows: Certificate[] = [];

  // Nuevas propiedades para el formulario de fechas
  dateFilter = {
    start: '',
    end: ''
  };

  private win = 2;

  showModal = false;
  editing: Certificate | null = null;

  // form usa la interface COMPLETA porque necesita todos los campos
  form: CertificateDetail & { productos?: DogProduct[] } = { 
    codigo: '', 
    productos: [] 
  };

  constructor(
    private api: CertificatesService,
    private dlg: DialogService
  ) { }

  ngOnInit() { this.load(); }

  get pages(): number { return Math.max(1, Math.ceil(this.total / this.per_page)); }

  pageItems(): (number | '…')[] {
    const last = this.pages;
    const cur  = this.page;
    const w    = this.win;

    const s = new Set<number>();
    s.add(1);
    for (let p = cur - w; p <= cur + w; p++) if (p > 1 && p < last) s.add(p);
    if (last > 1) s.add(last);

    const arr = Array.from(s).sort((a, b) => a - b);
    const out: (number | '…')[] = [];
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i]);
      if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push('…');
    }
    return out;
  }

  load() {
    this.loading = true;
    // list() devuelve Certificate[] (minimalista)
    this.api.list(this.search, this.dateFilter.start, this.dateFilter.end, this.page, this.per_page).subscribe({
      next: res => {
        this.rows = res.data ?? [];
        this.total = res.total ?? this.rows.length;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onPage(p: any) { 
    this.page = Math.min(Math.max(1, Number(p) || 1), this.pages); 
    this.load(); 
  }

  onSearch() { 
    this.page = 1; 
    this.load(); 
  }
  
  onDateFilter() {
    this.page = 1;
    this.load();
  }

  clearDateFilter() {
    this.dateFilter = { start: '', end: '' };
    this.onDateFilter();
  }

  private newDog(): DogProduct {
    return {
      cantidad: 1,
      unidad: 'UNIDADES/UNITS',
      producto: 'PERROS COMPAÑÍA',
      presentacion: '',
      code_chip: '',
      raza: '',
      empaque: 'No Aplica',
      sexo: 'Hembras',
      edad: '',
      valor_fob: 0
    };
  }

  addDog() { 
    (this.form.productos ||= []).push(this.newDog()); 
  }

  removeDog(i: number) { 
    this.form.productos?.splice(i, 1); 
  }

  openCreate() {
    this.editing = null;
    // Inicializar con TODOS los campos de CertificateDetail
    this.form = {
      codigo: '',
      Numero_Cis: '',
      puerto_salida: '',
      pais_destino: '',
      ruta_viaje: '',
      procedencia: '',
      via: '',
      importador: '',
      exportador: '',
      direccion_importador: '',
      direccion_exportador: '',
      dictamen: '',
      observaciones: '',
      fecha_precuarentena: '',
      nombre_predio: '',
      municipio: '',
      vereda: '',
      productos: [this.newDog()]
    };
    this.showModal = true;
  }

  openEdit(row: Certificate) {
    if (!row.id) { 
      this.dlg.error('Registro sin ID'); 
      return; 
    }
    
    this.editing = row;
    this.saving = true;

    // get() devuelve CertificateDetail (completo)
    this.api.get(row.id).subscribe({
      next: (res) => {
        this.form = {
          ...res.data,
          productos: (res.data?.productos ?? []).map(p => ({ ...p }))
        };
        this.saving = false;
        this.showModal = true;
      },
      error: (error) => { 
        this.saving = false; 
        this.dlg.error('No se pudo cargar el certificado'); 
      }
    });
  }

  save() {
    if (!this.form.codigo?.trim()) { 
      this.dlg.error('Código es obligatorio'); 
      return; 
    }

    this.saving = true;
    const req = this.editing?.id
      ? this.api.update(this.editing.id, this.form)
      : this.api.create(this.form);

    req.subscribe({
      next: () => {
        this.saving = false;
        this.showModal = false;
        this.dlg.toast('Guardado');
        this.load();
      },
      error: (e) => {
        this.saving = false;
        const msg = e?.error?.message || 'Error al guardar';
        this.dlg.error(msg);
      }
    });
  }

  onModalVisibleChange(v: any) { 
    this.showModal = !!v; 
  }

  async confirmDelete(row: Certificate, ev?: Event) {
    const ok = await this.dlg.confirmDelete('el certificado');
    if (!ok) return;

    this.api.delete(row.id!).subscribe({
      next: () => {
        this.dlg.toast('Eliminado');
        this.load();
      },
      error: (e) => {
        const msg = e?.error?.message || 'No se pudo eliminar';
        this.dlg.error(msg);
      }
    });
  }
}