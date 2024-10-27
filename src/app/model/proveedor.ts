import {Validators } from '@angular/forms';


export interface Proveedor {
	idProveedor: number;
	nombreProveedor: string;
	telefono:string;
	email:string;
	idDepartamento:number;
	idMunicipio:number;
	nombreDepartamento:string;
	nombreMunicipio:string;
	estado:string;
	direccion:string;
	
	
}

export let PROVEEDOR = {
	idProveedor:[],
	nombreProveedor:['',Validators.required],
	telefono:[''],
	email:[''],
	idDepartamento:[],
	idMunicipio:[],
	estado:[''],
	nombreMunicipi:[''],
	direccion:['']
	
  };