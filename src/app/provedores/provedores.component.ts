import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PROVEEDOR,Proveedor } from '../model/proveedor';
import { ProvedorSortService } from '../services/sort/provedor/provedor-sort.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  NgbdSortableHeaderProvedor,
  SortEvent,
} from '../sortable/sortableProvedor.directive';
import { GenericoService } from 'src/app/services/generico/generico.service';
import { ProveedorService } from 'src/app/services/negocio/proveedor/proveedor.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { CONSTANTES } from 'src/app/constants/INVETARIOJS.constants';

@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.component.html',
  styleUrls: ['./provedores.component.scss'],
  providers: [ProvedorSortService, DecimalPipe],
})
export class ProvedoresComponent {
  countries$: Observable<Proveedor[]>;
  total$: Observable<number>;
  provedorForm: FormGroup;
  categoriaVacio:FormGroup;
  listaProductos:Proveedor[]=[];
  detallesCategoria: any;
  tipoDepartamento:any
  tipoMunicipios:any
  mostarDetalleModal=false;
  @ViewChild('closebuttonCrear') closebuttonCrear:any;
  @ViewChild('closebuttonModificar') closebuttonModificar:any;

  @ViewChildren(NgbdSortableHeaderProvedor)
  headers!: QueryList<NgbdSortableHeaderProvedor>;
  isDropdownOpen = false;

  constructor(
    public service: ProvedorSortService,
    public translate: TranslateService,
	  public fb: FormBuilder,
	  public serviceGenerico: GenericoService,
    public proveedorsService:ProveedorService,
    private spinner: NgxSpinnerService


  ) {
    
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.translate.use('es');
	  this.provedorForm = this.fb.group(PROVEEDOR);
    this.categoriaVacio= this.fb.group(PROVEEDOR);
    this.obtenerDepartamentos()

  }

  ngOnInit(): void {

  }
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortableProve !== column) {
        header.directionProve = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  validarCampoObligatorio(campo: string): boolean {
	return !!(this.provedorForm.get(campo)?.invalid ?? false) && 
		   !!(this.provedorForm.get(campo)?.touched ?? false);
  }


  guardarProveedor(): void {
	if (this.provedorForm.invalid) {
		Object.values(this.provedorForm.controls).forEach((control) => {
		  control.markAsTouched();
		});
		return;
	  }
	  if(this.provedorForm.valid){
      
      Swal.fire({
        title: this.serviceGenerico.traduccionMensajeGenerico('TITULO_CONFIRMAR'),
        text: this.serviceGenerico.traduccionMensajeGenerico(
          'TEXTO_CONFIRMACION_CREAR_CATEGORIA'
        ),
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "bluea",
        cancelButtonText: this.serviceGenerico.traduccionMensajeGenerico('BOTON_CANCELAR'),
        confirmButtonText: this.serviceGenerico.traduccionMensajeGenerico('BOTON_CONFIRMAR'),
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      }).then((result) => {
        if (result.value) {
          this.spinner.show();
          this.proveedorsService
            .crearProveedor(this.provedorForm.value)
            .subscribe({
              next: (resp:any) => {

                this.spinner.hide();
                this.closebuttonCrear.nativeElement.click();
                this.recargarLista();
                if (
                  resp[CONSTANTES.CODIGO_RESPUESTA] &&
                  resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
                ) {
                  this.provedorForm.reset();
                  this.serviceGenerico.alertaMensajeInformacion(
                    resp[CONSTANTES.MENSAJE_RESPUESTA]
                  );
                  this.spinner.hide();
                  this.closebuttonCrear.nativeElement.click();
                  this.recargarLista();
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

	  }else {
		this.serviceGenerico.alertaMensajeInformacion(
		  this.serviceGenerico.traduccionMensajeGenerico('MENSAJE_RELLENE_TODOS_LOS_CAMPOS')
		);
	  }
  }
  editarProveedor(){
		if (this.provedorForm.invalid) {
      Object.values(this.provedorForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
      }
      if(this.provedorForm.valid){
        
        Swal.fire({
          title: this.serviceGenerico.traduccionMensajeGenerico('TITULO_CONFIRMAR'),
          text: this.serviceGenerico.traduccionMensajeGenerico(
            'TEXTO_CONFIRMACION_CREAR_CATEGORIA'
          ),
          showCancelButton: true,
          confirmButtonColor: "blue",
          cancelButtonColor: "bluea",
          cancelButtonText: this.serviceGenerico.traduccionMensajeGenerico('BOTON_CANCELAR'),
          confirmButtonText: this.serviceGenerico.traduccionMensajeGenerico('BOTON_CONFIRMAR'),
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        }).then((result) => {
          if (result.value) {
            this.spinner.show();
            this.proveedorsService
              .modificarProveedor(this.provedorForm.value)
              .subscribe({
                next: (resp:any) => {
  
                  this.spinner.hide();
                  this.recargarLista();
                  if (
                    resp[CONSTANTES.CODIGO_RESPUESTA] &&
                    resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
                  ) {
                    this.provedorForm.reset();
                    this.serviceGenerico.alertaMensajeInformacion(
                      resp[CONSTANTES.MENSAJE_RESPUESTA]
                    );
                    this.spinner.hide();
                    this.closebuttonModificar.nativeElement.click();
                    this.recargarLista();
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
                  this.closebuttonModificar.nativeElement.click();
                  this.spinner.hide();
                },
              });
          } else {
          }
        });
  
      }else {
      this.serviceGenerico.alertaMensajeInformacion(
        this.serviceGenerico.traduccionMensajeGenerico('MENSAJE_RELLENE_TODOS_LOS_CAMPOS')
      );
      }
	  
  }

  resetearFormulario(){
    this.provedorForm.reset();
    this.provedorForm.patchValue(this.categoriaVacio.value);
  }
   recargarLista(){
    this.service.obtenerCategorias();
    this.service.searchTerm = '';
  }

    detalleItem(item:Proveedor){
      this.mostarDetalleModal = true;
    // Inicializar detallesCategoria si no está inicializado aún
    if (!this.detallesCategoria) {
        this.detallesCategoria = { nombreProveedor: '', estado: '' };
    }
    this.detallesCategoria.nombreProveedor = item.nombreProveedor;
    this.detallesCategoria.direccion = item.direccion;
    this.detallesCategoria.email = item.email;
    this.detallesCategoria.idDepartamento = item.idDepartamento;
    this.detallesCategoria.nombreDepartamento = item.nombreDepartamento;
    this.detallesCategoria.nombreMunicipio = item.nombreMunicipio;
    this.detallesCategoria.telefono = item.telefono;
    this.detallesCategoria.estado = item.estado;

    console.log(this.detallesCategoria);
  }
  


  cargarModificar(item:Proveedor){
    this.mostarDetalleModal=false;
    console.log(item.idDepartamento);
    this.provedorForm.patchValue({
      idProveedor: item.idProveedor,
      nombreProveedor: item.nombreProveedor,
      direccion: item.direccion,
      email: item.email,
      telefono: item.telefono,
      idMunicipio: item.idMunicipio,
      nombreMunicipio: item.nombreMunicipio,
      idDepartamento: item.idDepartamento,      
      estado:item.estado
      });
      this.obtenerMunicipios(item.idMunicipio);

  }
  cambiarEstado(item:Proveedor){
    this.spinner.show();
     this.proveedorsService.cambiarEstadoProveedor(item).subscribe({
       next: (resp:any) => {
        if (
          resp[CONSTANTES.CODIGO_RESPUESTA] &&
          resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
        ) {
          this.serviceGenerico.alertaMensajeInformacion(resp[CONSTANTES.MENSAJE_RESPUESTA]);

          this.recargarLista();
        } else {
          this.serviceGenerico.alertaMensajeInformacion(resp[CONSTANTES.MENSAJE_RESPUESTA]);
        }
       },

      error: (err: any) => {},

      complete: () => {
        this.spinner.hide();
      },
    });


  }
  
  obtenerMunicipios(id:any) {
    let valor:number
    if(id instanceof Event){
      const target = id.target as HTMLInputElement; // Asumimos que el evento proviene de un <input>
      valor = Number(target.value); // Obtiene el valor como string
    }
    else{
      valor=id
    }
    
    this.spinner.show();
    this.serviceGenerico.obtenerMunicipios(valor).subscribe({
      next: (resp:any) => {
        
        this.tipoMunicipios = resp['lista'];

        if (
          resp[CONSTANTES.CODIGO_RESPUESTA] &&
          resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
        ) {
          this.tipoMunicipios = resp['lista'];
        }
      },

      error: (err: any) => {},

      complete: () => {
        this.spinner.hide();
      },
    });
  }

  obtenerDepartamentos() {
    this.spinner.show();
    this.serviceGenerico.obtenerDepartamento().subscribe({
      next: (resp:any) => {
        console.log(resp['lista']);
        this.tipoDepartamento = resp['lista'];

        if (
          resp[CONSTANTES.CODIGO_RESPUESTA] &&
          resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
        ) {
          this.tipoDepartamento = resp['lista'];
        }
      },

      error: (err: any) => {},

      complete: () => {
        this.spinner.hide();
      },
    });
  }
 
}
