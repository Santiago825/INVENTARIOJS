import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login, LOGIN } from '../model/login';
import { TranslateService } from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CONSTANTES } from 'src/app/constants/INVETARIOJS.constants';
import { LoginService } from '../services/negocio/Login/login.service';
import { LoginClass} from '../model/loginClass';
import { GenericoService } from '../services/generico/generico.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
    private loginService: LoginService,
    public serviceGenerico: GenericoService
  ) {
    this.translate.use('es');
    this.loginForm = this.fb.group(LOGIN);
  }
  generarSHA512(texto: string): string {
    const hash = CryptoJS.SHA512(texto);
    return hash.toString(CryptoJS.enc.Hex); // Convierte el hash en una cadena hexadecimal
  }

  validarLogin() {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    const hashSHA512 = this.generarSHA512(this.loginForm.get('clave')?.value);
    console.log('SHA-512:', hashSHA512);

    let login =new LoginClass;
    login.login=this.loginForm.get('login')?.value
    login.clave=hashSHA512
    console.log(login);

    this.spinner.show();
    // this.loginService.validarLogin(login).subscribe({
    //   next: (resp: any) => {
    //     this.spinner.hide();
    //     if (
    //       resp[CONSTANTES.CODIGO_RESPUESTA] &&
    //       resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
    //     ) {

    //       this.spinner.hide();
    //     } else if (
    //       resp[CONSTANTES.CODIGO_RESPUESTA] &&
    //       (resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.CORREO_EXISTE ||
    //         resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.DOCUMENTO_EXISTE)
    //     ) {
    //       this.serviceGenerico.alertaMensajeInformacion(
    //         resp[CONSTANTES.MENSAJE_RESPUESTA]
    //       );
    //       this.spinner.hide();
    //     }
    //   },
    //   error: (err: any) => {
    //     console.error('err', err);
    //   },

    //   complete: () => {
    //     this.loginForm.reset();

    //     this.spinner.hide();
    //   },
    // });
  }

  validarCampoObligatorio(campo: string) {
    return (
      !!(this.loginForm.get(campo)?.invalid ?? false) &&
      !!(this.loginForm.get(campo)?.touched ?? false)
    );
  }
}
