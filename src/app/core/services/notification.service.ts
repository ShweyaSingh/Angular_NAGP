import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  public showSuccess(message: string): void {
    this.toastr.success('', message, { timeOut: 2000 });
  }

  public showError(message: string): void {
    this.toastr.error('', message, { timeOut: 2000 });
  }

  public showWarning(message: string): void {
    this.toastr.warning('', message, { timeOut: 2000 });
  }

  public showInfo(message: string): void {
    this.toastr.info('', message, { timeOut: 2000 });
  }
}
