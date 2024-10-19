import {Validators } from '@angular/forms';


export interface Proveedor {
	idProveedor: number;
	nombreProveedor: string;
	telefono:string;
	email:string;
	idmunicipio:string;
	estado:string;
	direccion:string;
	
	
}

export let PROVEEDOR = {
	idProveedor:[],
	nombreProveedor:['',Validators.required],
	telefono:[''],
	email:[''],
	idmunicipio:[''],
	estado:[''],
	direccion:['']
	
  };