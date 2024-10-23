import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PRODUCTO,Producto } from '../model/productos';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  NgbdSortableHeaderProducto,
  SortEvent,
} from '../sortable/sortableProducto.directive';
import { GenericoService } from 'src/app/services/generico/generico.service';
import { ProdcutosSortService } from 'src/app/services/sort/productos/prodcutos-sort.service';
import { ProductosService } from 'src/app/services/negocio/productos/productos.service';
import { CategoriasService } from 'src/app/services/negocio/categorias/categorias.service';

import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { Categorias } from '../model/categorias';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProdcutosSortService, DecimalPipe]
})
export class ProductosComponent implements OnInit {
	countries$: Observable<Producto[]>;
  total$: Observable<number>;
  productoForm: FormGroup;
  categoriaVacio:FormGroup;
  listaProductos:Producto[]=[];
  listaCategorias:Categorias[]=[];
  detallesProducto: any;
  mostarDetalleModal=false;
  imageUrl: string | null = null;
  imagenBase64:any="";
  selectedFileName: string = "Seleccione imagen";

  @ViewChild('closebuttonCrear') closebuttonCrear:any;
  @ViewChild('closebuttonModificar') closebuttonModificar:any;

  @ViewChildren(NgbdSortableHeaderProducto)
  headers!: QueryList<NgbdSortableHeaderProducto>;
  isDropdownOpen = false;

  constructor(
    public service: ProdcutosSortService,
    public translate: TranslateService,
	public fb: FormBuilder,
	public serviceGenerico: GenericoService,
    public productosService:ProductosService,
    public  categoriasService:CategoriasService,
    private spinner: NgxSpinnerService


  ) {
    
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.translate.use('es');
	  this.productoForm = this.fb.group(PRODUCTO);
    this.categoriaVacio= this.fb.group(PRODUCTO);
    this.obtenerCategorias();
 

  }

  ngOnInit(): void {}
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortableProdu !== column) {
        header.directionProdu = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  validarCampoObligatorio(campo: string): boolean {
	return !!(this.productoForm.get(campo)?.invalid ?? false) && 
		   !!(this.productoForm.get(campo)?.touched ?? false);
  }
  convertirBase64AImagen(base64: string): string {
    // Remueve espacios en blanco
    base64 = base64.trim();

    // Verifica si el Base64 tiene un prefijo con tipo MIME
    if (base64.startsWith('data:image')) {
      return base64; // Ya tiene un prefijo válido, así que lo usamos tal cual
    } else {
      // Si no tiene prefijo, intenta deducir el tipo MIME
      const mimeType = this.deducirTipoMime(base64);
      return `data:${mimeType};base64,${base64}`;
    }
  }

  // Función que intenta deducir el tipo MIME en base al contenido Base64
  private deducirTipoMime(base64: string): string {
    // Usa los primeros caracteres Base64 para deducir el tipo
    if (base64.startsWith('/9j')) {
      return 'image/jpeg'; // Es un JPEG
    } else if (base64.startsWith('iVBORw0KGgo')) {
      return 'image/png'; // Es un PNG
    } else if (base64.startsWith('R0lGODdh') || base64.startsWith('R0lGODlh')) {
      return 'image/gif'; // Es un GIF
    } else if (base64.startsWith('UklGR')) {
      return 'image/webp'; // Es un WebP
    } else {
      return 'image/png'; // Tipo predeterminado (PNG)
    }
  }

  imagenSeleccionada(event: any) {
    const file: File = event.target.files[0];
    
    if (file && file.type.startsWith('image/')) {
      this.selectedFileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    else{
      this.serviceGenerico.alertaMensajeInformacion(this.serviceGenerico.traduccionMensajeGenerico("CU_ADMIN_ALIADOS.MENSAJE_SOLO_IMAGENES"))
      this.eliminarImagenSeleccionada();
    }
    console.log(this.imagenBase64);
  }
  eliminarImagenSeleccionada(){
    this.selectedFileName = this.serviceGenerico.traduccionMensajeGenerico("PLACEHOLDER_IMAGEN");
    this.imagenBase64=null;
  }


  guardarProducto() {
    if (this.productoForm.invalid) {
      Object.values(this.productoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
    console.log(this.productoForm);


    if (this.productoForm.valid) {
      Swal.fire({
        title: this.serviceGenerico.traduccionMensajeGenerico('TITULO_CONFIRMAR'),
        text: this.serviceGenerico.traduccionMensajeGenerico("TEXTO_CONFIRMACION_CREAR_ALIADO"),
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "blue",
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
          this.productoForm.patchValue({
            imagenProducto: this.imagenBase64
          })
          this.productosService.crearProducto(this.productoForm.value).subscribe({
            next: (resp) => {

              // if (
              //   resp[CONSTANTES.CODIGO_RESPUESTA] &&
              //   resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
              // ) {
                this.productoForm.reset();
                // this.serviceGenerico.alertaMensajeInformacion(
                //   resp[CONSTANTES.MENSAJE_RESPUESTA]
                // );

                this.closebuttonCrear.nativeElement.click();
                this.recargarLista();
              // } else {
              //   this.serviceGenerico.alertaMensajeInformacion(
              //     resp[CONSTANTES.MENSAJE_RESPUESTA]
              //   );
              // }
            },
            error: (err: any) => {
              console.error(err);
            },

            complete: () => {
              this.spinner.hide();
            },
          });
        }
      });
    } else {
      this.spinner.hide();
      this.serviceGenerico.alertaMensajeInformacion(
        this.serviceGenerico.traduccionMensajeGenerico('MENSAJE_RELLENE_TODOS_LOS_CAMPOS')
      );
    }
  }
  editarCategoria(){
		if (this.productoForm.invalid) {
      Object.values(this.productoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
      }
      if(this.productoForm.valid){
        
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
            this.productosService
              .modificarProducto(this.productoForm.value)
              .subscribe({
                next: (resp) => {
  
                  this.spinner.hide();
                  this.closebuttonModificar.nativeElement.click();
                  this.recargarLista();
                  // if (
                  //   resp[CONSTANTES.CODIGO_RESPUESTA] &&
                  //   resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
                  // ) {
                  //   this.productoForm.reset();
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
  editarProducto() {
    if (this.productoForm.invalid) {
      Object.values(this.productoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.spinner.hide();
      return;
    }

    if (this.productoForm.valid) {
      Swal.fire({
        title: this.serviceGenerico.traduccionMensajeGenerico('TITULO_CONFIRMAR'),
        text: this.serviceGenerico.traduccionMensajeGenerico('TEXTO_CONFIRMACION'),
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "blue",
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
          this.productoForm.patchValue({
            imagen: this.imagenBase64 
          })
          this.productosService.modificarProducto(this.productoForm.value).subscribe({
            next: (resp) => {
              // if (
              //   resp[CONSTANTES.CODIGO_RESPUESTA] &&
              //   resp[CONSTANTES.CODIGO_RESPUESTA] === CONSTANTES.OK
              // ) {
              //   this.serviceGenerico.alertaMensajeInformacion(
              //     resp[CONSTANTES.MENSAJE_RESPUESTA]
              //   );

                this.recargarLista();
                this.productoForm.reset();
                this.closebuttonModificar.nativeElement.click();
              // } else {
              //   this.serviceGenerico.alertaMensajeInformacion(
              //     resp[CONSTANTES.MENSAJE_RESPUESTA]
              //   );
              //}
            },

            error: (err: any) => {},

            complete: () => {
              this.spinner.hide();
            },
          });
        }
      });
    } else {
      this.serviceGenerico.alertaMensajeInformacion(
        this.serviceGenerico.traduccionMensajeGenerico('MENSAJE_RELLENE_TODOS_LOS_CAMPOS')
      );

      this.spinner.hide();
    }
  }

  resetearFormulario(){
    this.productoForm.reset();
    this.productoForm.patchValue(this.categoriaVacio.value);
  }
   recargarLista(){
    this.service.obtenerCategorias();
    this.service.searchTerm = '';
  }

    detalleItem(item:Producto){
      this.mostarDetalleModal = true;
    // Inicializar detallesCategoria si no está inicializado aún
    if (!this.detallesProducto) {
        this.detallesProducto = { nombreCategoria: '', estadoCategoria: '' };
    }
    this.detallesProducto.nombreProducto = item.nombreProducto;
    this.detallesProducto.cantidadProducto = item.cantidadProducto;
    this.detallesProducto.precioProducto = item.precioProducto;
    this.detallesProducto.imagenProducto = item.imagenProducto;
    this.detallesProducto.nombreCategoria = item.nombreCategoria;
    this.detallesProducto.estadoProducto = item.estadoProducto;
  }

  cargarModificar(item:Producto){
    this.mostarDetalleModal=false;
    this.productoForm.patchValue({
      idProducto: item.idProducto,
      nombreProducto: item.nombreProducto,
      cantidadProducto: item.cantidadProducto,
      precioProducto: item.precioProducto,
      idCategoria: item.idCategoria,
      imagenProducto: item.imagenProducto,
      estadoCategoria:item.estadoProducto
      });
      this.selectedFileName =this.productoForm.get("imagenProducto")?.value==null?this.serviceGenerico.traduccionMensajeGenerico("CU_ADMIN_ALIADOS.PLACEHOLDER_IMAGEN"):this.imagenBase64=this.productoForm.get("imagenProducto")?.value


  }
  obtenerCategorias() {
    this.spinner.show();
    this.categoriasService.obtenerCategorias().subscribe(
      (response: any) => {
        this.listaCategorias = response['lista'];
        console.log(this.listaCategorias);
        this.spinner.hide();
      },
      (error: any) => {
        this.spinner.hide();
       
      }
    );
  }
  cambiarEstado(item:Producto){
    this.spinner.show();
    this.productosService.cambiarEstadoProducto(item).subscribe({
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
