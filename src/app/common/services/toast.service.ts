import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  static instance: ToastService;
  
  constructor(private messageService: MessageService) {
     ToastService.instance = this
   }

  showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showWarning(message: string): void {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: message });
  }

  showInfo(message: string): void {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message});
  }

}
