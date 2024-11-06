import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor( private storageService: StorageService ) { }

  setValueRolUsuario(key: string, value: any): void {
    this.storageService.secureLocalStorageRolUsuario.setItem(key, value);
  }

  getValueRolUsuario(key: string): string {
    return this.storageService.secureLocalStorageRolUsuario.getItem(key);
  }

  clearRolUsuario(key: string): string {
    return this.storageService.secureLocalStorageRolUsuario.removeItem(key);
  }

  setValueIdUsuario(key: string, value: any): void {
    this.storageService.secureLocalStorageIdUsuario.setItem(key, value);
  }

  getValueIdUsuario(key: string): string {
    return this.storageService.secureLocalStorageIdUsuario.getItem(key);
  }

  clearIdUsuario(key: string): string {
    return this.storageService.secureLocalStorageIdUsuario.removeItem(key);
  }
}
