import {Validators } from '@angular/forms';


export interface Producto {
	idProducto: number;
	nombreProducto: string;
	idCategoria:number;
	nombreCategoria:string;
	precioProducto:number;
	cantidadProducto:number;
	imagenProducto:string;
	estadoProducto:string;
	
	
	
}

export let PRODUCTO = {
	idProducto:[],
	nombreProducto:['',Validators.required],
	idCategoria:[''],
	nombreCategoria:[''],
	precioProducto:[''],
	cantidadProducto:[''],
	imagenProducto:[''],
	estadoProducto:['']
	
  };