import {Validators } from '@angular/forms';


export interface Categorias {
	idCategoria: number;
	nombreCategoria: string;
	estadoCategoria:string;
	
}

export let CATEGORIAFORM = {
	idCategoria:[],
	nombreCategoria:['',Validators.required],
	estadoCategoria:[''],
  };