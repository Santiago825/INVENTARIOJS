import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericoService } from 'src/app/services/generico/generico.service';
import { LoginService } from 'src/app/services/negocio/Login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CONSTANTES } from 'src/app/constants/INVETARIOJS.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;
  tipoDocumento: any;

  constructor(
    private fb: FormBuilder,
    public serviceGenerico: GenericoService,
    public loginService: LoginService,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,

  ) {
    this.translate.use('es');

    this.registroForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        apellido: ['', [Validators.required, Validators.minLength(3)]],
        tipoDocumento: ['', [Validators.required]],
        numeroDocumento: ['', [Validators.required]],
        telefono: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(10),
          ],
        ],
        correo: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmarContrasena: ['', [Validators.required]],
      },
      { validators: this.passwordsIguales }
    );
    this.obtenerTipoDocumento();
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordsIguales(formGroup: FormGroup) {
    const contrasena = formGroup.get('contrasena')?.value;
    const confirmarContrasena = formGroup.get('confirmarContrasena')?.value;
    return contrasena === confirmarContrasena ? null : { noCoincide: true };
  }
  obtenerTipoDocumento() {
    this.spinner.show();
    this.serviceGenerico.obtenerTipoDocumento().subscribe({
      next: (resp: any) => {
        if (
          resp[CONSTANTES.CODIGO_RESPUESTA] &&
          resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
        ) {
          console.log(resp['lista']);
          this.tipoDocumento = resp['lista'];
        }
      },

      error: (err: any) => {},

      complete: () => {
        this.spinner.hide();
      },
    });
  }

  // Método para enviar el formulario
  crearUsuario() {
    if (this.registroForm.valid) {
      Swal.fire({
        title:
          this.serviceGenerico.traduccionMensajeGenerico('TITULO_CONFIRMAR'),
        text: this.serviceGenerico.traduccionMensajeGenerico(
          'TEXTO_CONFIRMACION_CREAR_CATEGORIA'
        ),
        showCancelButton: true,
        confirmButtonColor: 'blue',
        cancelButtonColor: 'bluea',
        cancelButtonText:
          this.serviceGenerico.traduccionMensajeGenerico('BOTON_CANCELAR'),
        confirmButtonText:
          this.serviceGenerico.traduccionMensajeGenerico('BOTON_CONFIRMAR'),
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      }).then((result) => {
        if (result.value) {
          this.spinner.show();
          this.loginService
            .registrarUsuario(this.registroForm.value)
            .subscribe({
              next: (resp: any) => {
                if (
                  resp[CONSTANTES.CODIGO_RESPUESTA] &&
                  resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
                ) {
                  this.registroForm.reset();
                  this.serviceGenerico.alertaMensajeInformacion(
                    resp[CONSTANTES.MENSAJE_RESPUESTA]
                  );
                } else if (
                  resp[CONSTANTES.CODIGO_RESPUESTA] &&
                  (resp[CONSTANTES.CODIGO_RESPUESTA] ===
                    CONSTANTES.CORREO_EXISTE ||
                    resp[CONSTANTES.CODIGO_RESPUESTA] ===
                      CONSTANTES.DOCUMENTO_EXISTE)
                ) {
                  this.serviceGenerico.alertaMensajeInformacion(
                    resp[CONSTANTES.MENSAJE_RESPUESTA]
                  );
                  this.spinner.hide();
                }
              },
              error: (err: any) => {
                console.error('err', err);
              },

              complete: () => {
                this.spinner.hide();
              },
            });
        } else {
        }
      });
    } else {
      this.serviceGenerico.alertaMensajeInformacion(
        this.serviceGenerico.traduccionMensajeGenerico(
          'MENSAJE_RELLENE_TODOS_LOS_CAMPOS'
        )
      );
    }

    // if (this.registroForm.valid) {
    //   console.log('Formulario enviado:', this.registroForm.value);
    // } else {
    //   console.log('Formulario no válido');
    //   this.registroForm.markAllAsTouched();
    // }
  }
}
