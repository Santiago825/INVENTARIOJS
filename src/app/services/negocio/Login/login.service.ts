import { Injectable } from '@angular/core';
import { Login } from 'src/app/model/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginClass } from 'src/app/model/loginClass';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  validarLogin(data:LoginClass){
    console.log("enterees");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    console.log(data);

    return this.http.post(`http://localhost:8080/validar_login`,data);
  }
  registrarUsuario(data:any){
    console.log("enterees");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    console.log(data);

    return this.http.post(`http://localhost:8080/registrar_usuario`,data);
  }
}
