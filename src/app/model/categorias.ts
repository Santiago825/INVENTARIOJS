import {Validators } from '@angular/forms';


export interface Categorias {
	id: number;
	nombre: string;
	estado:string;
	
}

export let CATEGORIAFORM = {
	idCategoria:[],
	nombre:['',Validators.required],
	estadoAliado:[''],
  };