import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DialogService {
  async confirm(
    title: string,
    text = '',
    confirmText = 'Aceptar',
    cancelText = 'Cancelar',
    icon: SweetAlertIcon = 'question'
  ): Promise<boolean> {
    const r = await Swal.fire({
      title, text, icon,
      showCancelButton: true, reverseButtons: true,
      confirmButtonText: confirmText, cancelButtonText: cancelText
    });
    return r.isConfirmed;
  }

  async confirmDelete(what = 'el registro') {
    return this.confirm('¿Eliminar?', `Se eliminará ${what}.`, 'Sí, eliminar');
  }

  toast(title: string, icon: SweetAlertIcon = 'success') {
    return Swal.fire({
      toast: true, position: 'top-end', icon, title,
      showConfirmButton: false, timer: 1800, timerProgressBar: true
    });
  }

  error(message = 'Ocurrió un error') {
    return Swal.fire({ icon: 'error', title: 'Ups…', text: message });
  }

  success(message = 'Operación exitosa') {
    return Swal.fire({ icon: 'success', title: 'OK', text: message });
  }

  loading(message = 'Procesando…') {
    return Swal.fire({
      title: message, allowOutsideClick: false, didOpen: () => Swal.showLoading()
    });
  }
  close() { Swal.close(); }
}
