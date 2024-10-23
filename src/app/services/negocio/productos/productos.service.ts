import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from 'src/app/model/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {

  }
  obtenerProductos(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });

    return this.http.get(`http://localhost:8080/obtener_productos`);
  }
  detalleProducto(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });

    return this.http.get(`http://localhost:8080/detalle_categorias?id=${id}`);
  }

  crearProducto(data:Producto){
    console.log("enterees");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    console.log(data);

    return this.http.post(`http://localhost:8080/crear_producto`,data);
  }
  modificarProducto(data:Producto){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    return this.http.put(`http://localhost:8080/modificar_producto`,data);
  }
  cambiarEstadoProducto(data:Producto){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    return this.http.put(`http://localhost:8080/cambiar_estado_producto`,data);
  }



}
