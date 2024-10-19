import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Categorias,CATEGORIAFORM } from '../model/categorias';
import { CategoriaService } from '../services/categoria/categoria.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  NgbdSortableHeaderCategoria,
  SortEvent,
} from '../sortable/sortableCategoria.directive';
import { GenericoService } from 'src/app/services/generico/generico.service';
import { CategoriasService } from 'src/app/services/negocio/categorias/categorias.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  providers: [CategoriaService, DecimalPipe],
})
export class CategoriasComponent {
  countries$: Observable<Categorias[]>;
  total$: Observable<number>;
  categoriaForm: FormGroup;
  categoriaVacio:FormGroup;
  listaProductos:Categorias[]=[];
  detallesCategoria: any;
  mostarDetalleModal=false;
  @ViewChild('closebuttonCrear') closebuttonCrear:any;
  @ViewChild('closebuttonModificar') closebuttonModificar:any;

  @ViewChildren(NgbdSortableHeaderCategoria)
  headers!: QueryList<NgbdSortableHeaderCategoria>;
  isDropdownOpen = false;

  constructor(
    public service: CategoriaService,
    public translate: TranslateService,
	  public fb: FormBuilder,
	  public serviceGenerico: GenericoService,
    public categoriasService:CategoriasService,
    private spinner: NgxSpinnerService


  ) {
    
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.translate.use('es');
	  this.categoriaForm = this.fb.group(CATEGORIAFORM);
    this.categoriaVacio= this.fb.group(CATEGORIAFORM);
 

  }

  ngOnInit(): void {}
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortableCate !== column) {
        header.directionCate = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  validarCampoObligatorio(campo: string): boolean {
	return !!(this.categoriaForm.get(campo)?.invalid ?? false) && 
		   !!(this.categoriaForm.get(campo)?.touched ?? false);
  }


  guardarCategoria(): void {
	if (this.categoriaForm.invalid) {
		Object.values(this.categoriaForm.controls).forEach((control) => {
		  control.markAsTouched();
		});
		return;
	  }
	  if(this.categoriaForm.valid){
      
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
          this.categoriasService
            .crearCategorias(this.categoriaForm.value)
            .subscribe({
              next: (resp) => {

                this.spinner.hide();
                this.closebuttonCrear.nativeElement.click();
                this.recargarLista();
                // if (
                //   resp[CONSTANTES.CODIGO_RESPUESTA] &&
                //   resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
                // ) {
                //   this.categoriaForm.reset();
                //   this.serviceGenerico.alertaMensajeInformacion(
                //     resp[CONSTANTES.MENSAJE_RESPUESTA]
                //   );
                //   this.spinner.hide();
                //   this.closebuttonCrear.nativeElement.click();
                //   this.recargarLista();
                // } else if (
                //   resp[CONSTANTES.CODIGO_RESPUESTA] &&
                //   (resp[CONSTANTES.CODIGO_RESPUESTA] ===
                //     CONSTANTES.CORREO_EXISTE ||
                //     resp[CONSTANTES.CODIGO_RESPUESTA] ===
                //       CONSTANTES.DOCUMENTO_EXISTE)
                // ) {
                //   this.serviceGenerico.alertaMensajeInformacion(
                //     resp[CONSTANTES.MENSAJE_RESPUESTA]
                //   );
                //   this.spinner.hide();
                // }
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
  editarCategoria(){
		if (this.categoriaForm.invalid) {
      Object.values(this.categoriaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
      }
      if(this.categoriaForm.valid){
        
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
            this.categoriasService
              .modificarCategorias(this.categoriaForm.value)
              .subscribe({
                next: (resp) => {
  
                  this.spinner.hide();
                  this.closebuttonModificar.nativeElement.click();
                  this.recargarLista();
                  // if (
                  //   resp[CONSTANTES.CODIGO_RESPUESTA] &&
                  //   resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
                  // ) {
                  //   this.categoriaForm.reset();
                  //   this.serviceGenerico.alertaMensajeInformacion(
                  //     resp[CONSTANTES.MENSAJE_RESPUESTA]
                  //   );
                  //   this.spinner.hide();
                  //   this.closebuttonCrear.nativeElement.click();
                  //   this.recargarLista();
                  // } else if (
                  //   resp[CONSTANTES.CODIGO_RESPUESTA] &&
                  //   (resp[CONSTANTES.CODIGO_RESPUESTA] ===
                  //     CONSTANTES.CORREO_EXISTE ||
                  //     resp[CONSTANTES.CODIGO_RESPUESTA] ===
                  //       CONSTANTES.DOCUMENTO_EXISTE)
                  // ) {
                  //   this.serviceGenerico.alertaMensajeInformacion(
                  //     resp[CONSTANTES.MENSAJE_RESPUESTA]
                  //   );
                  //   this.spinner.hide();
                  // }
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

  resetearFormulario(){
    this.categoriaForm.reset();
    this.categoriaForm.patchValue(this.categoriaVacio.value);
  }
   recargarLista(){
    this.service.obtenerCategorias();
    this.service.searchTerm = '';
  }

    detalleItem(item:Categorias){
      this.mostarDetalleModal = true;
    // Inicializar detallesCategoria si no está inicializado aún
    if (!this.detallesCategoria) {
        this.detallesCategoria = { nombreCategoria: '', estadoCategoria: '' };
    }
    this.detallesCategoria.nombreCategoria = item.nombreCategoria;
    this.detallesCategoria.estadoCategoria = item.estadoCategoria;
  }

  cargarModificar(item:Categorias){
    this.mostarDetalleModal=false;
    this.categoriaForm.patchValue({
      idCategoria: item.idCategoria,
      nombreCategoria: item.nombreCategoria,
      estadoCategoria:item.estadoCategoria
      });

  }
  cambiarEstado(item:Categorias){
    this.spinner.show();
    this.categoriasService.cambiarEstadoCategorias(item).subscribe({
      next: (resp) => {
        // if (
        //   resp[CONSTANTES.CODIGO_RESPUESTA] &&
        //   resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
        // ) {
        //   this.serviceGenerico.alertaMensajeInformacion(resp[CONSTANTES.MENSAJE_RESPUESTA]);

           this.recargarLista();
        // } else {
        //   this.serviceGenerico.alertaMensajeInformacion(resp[CONSTANTES.MENSAJE_RESPUESTA]);
        // }
      },

      error: (err: any) => {},

      complete: () => {
        this.spinner.hide();
      },
    });


  }
 
}
