import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericoService {

  constructor(
    public translate: TranslateService,
    private http: HttpClient
  ) { 
    
  }
  obtenerDepartamento(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    return this.http.get(`http://localhost:8080/consultar_departamentos`);
  }
  obtenerMunicipios(id:number){
    console.log("hilton");
    console.log(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'state': `categorias`,
    });
    return this.http.get(`http://localhost:8080/consultar_municipio?id=${id}`);
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
