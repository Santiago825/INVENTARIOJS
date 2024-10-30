import {Validators } from '@angular/forms';


export interface Login {
	login: string;
	clave: string;

	
}

export let LOGIN = {
	login:['',Validators.required],
	clave:['',Validators.required],
  };