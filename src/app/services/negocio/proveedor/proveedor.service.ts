import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proveedor } from 'src/app/model/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {


  constructor(private http: HttpClient) {

  }
  obtenerProveedor(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });

    return this.http.get(`http://localhost:8080/obtener_proveedor`);
  }
  detalleProveedor(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });

    return this.http.get(`http://localhost:8080/detalle_categorias?id=${id}`);
  }

  crearProveedor(data:Proveedor){
    console.log("enterees");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    console.log(data);

    return this.http.post(`http://localhost:8080/crear_proveedor`,data);
  }
  modificarProveedor(data:Proveedor){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    return this.http.put(`http://localhost:8080/modificar_proveedor `,data);
  }
  cambiarEstadoProveedor(data:Proveedor){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    return this.http.put(`http://localhost:8080/cambiar_estado_proveedor`,data);
  }
}
