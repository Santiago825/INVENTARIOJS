import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

import { environment } from 'src/app/environments/environment';

import SecureStorage from 'secure-web-storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public secureLocalStorageRolUsuario = new SecureStorage(localStorage, {
    hash: function hash(key: string): string {
      //key = CryptoJS.SHA256(key, environment.pf);

      return '6498b502a3b1558263d2a8cd599d6bbe'//;key.toString();
    },
    encrypt: function encrypt(data: any): string {
      data = CryptoJS.AES.encrypt(data, environment.pf);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data: any): string {
      data = CryptoJS.AES.decrypt(data, environment.pf);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    }
  });

  public secureLocalStorageIdUsuario = new SecureStorage(localStorage, {
    hash: function hash(key: string): string {
      //key = CryptoJS.SHA256(key, environment.pf);

      return '6497b502a3b5668163d2a9cb599d6bbe'//;key.toString();
    },
    encrypt: function encrypt(data: any): string {
      data = CryptoJS.AES.encrypt(data, environment.pf);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data: any): string {
      data = CryptoJS.AES.decrypt(data, environment.pf);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    }
  });
}
