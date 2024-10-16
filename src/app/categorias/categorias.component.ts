import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
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

  @ViewChildren(NgbdSortableHeaderCategoria)
  headers!: QueryList<NgbdSortableHeaderCategoria>;

  constructor(
    public service: CategoriaService,
    public translate: TranslateService,
	public fb: FormBuilder,
	public serviceGenerico: GenericoService,


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

	  }else {
		this.serviceGenerico.alertaMensajeInformacion(
		  this.serviceGenerico.traduccionMensajeGenerico('MENSAJE_RELLENE_TODOS_LOS_CAMPOS')
		);
	  }
	console.log(this.categoriaForm);
  }
  editarCategoria(){
	if (this.categoriaForm.invalid) {
		Object.values(this.categoriaForm.controls).forEach((control) => {
		  control.markAsTouched();
		});
		return;
	  }
	  
  }

  resetearFormulario(){
    this.categoriaForm.reset();
    this.categoriaForm.patchValue(this.categoriaVacio.value);
  }
  obtenerObjeto(obj:Categorias){
	console.log(obj);
	this.categoriaForm.patchValue({
		nombre: obj.nombre
	  });

  }
}
