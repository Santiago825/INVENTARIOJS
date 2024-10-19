import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categorias } from 'src/app/model/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) {

  }
  obtenerCategorias(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });

    return this.http.get(`http://localhost:8080/obtener_categorias`);
  }
  detalleCategoria(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });

    return this.http.get(`http://localhost:8080/detalle_categorias?id=${id}`);
  }

  crearCategorias(data:Categorias){
    console.log("enterees");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    console.log(data);

    return this.http.post(`http://localhost:8080/crear_categoria`,data);
  }
  modificarCategorias(data:Categorias){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    return this.http.put(`http://localhost:8080/modificar_categorias`,data);
  }
  cambiarEstadoCategorias(data:Categorias){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    return this.http.put(`http://localhost:8080/cambiar_estado_categorias`,data);
  }



}
