import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class GenericoService {

  constructor(
    public translate: TranslateService,
  ) { 
    
  }

  alertaMensajeInformacion(texto:string) {
    Swal.fire({
      title: this.traduccionMensajeGenerico('MENSAJE_INFORMACION'),
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      text: texto,
    });
  }
  traduccionMensajeGenerico(variableTraduccion: string) {
    let traduccionMensaje: string="";
    this.translate
      .get(variableTraduccion)
      .subscribe((trad: string) => {
        traduccionMensaje = trad;
      });
    return traduccionMensaje;
  }
}
