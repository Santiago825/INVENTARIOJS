import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren,OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {Productos} from '../model/productos';
import {ProdcutosSortService} from '../services/sort/productos/prodcutos-sort.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgbdSortableHeaderProducto, SortEvent} from '../sortable/sortableProducto.directive';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProdcutosSortService, DecimalPipe]
})
export class ProductosComponent implements OnInit {
	countries$: Observable<Productos[]>;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeaderProducto) headers!: QueryList<NgbdSortableHeaderProducto>;

  constructor(public service: ProdcutosSortService,    public translate: TranslateService,
  ) {
		this.countries$ = service.countries$;
		this.total$ = service.total$;
		this.translate.use('es');
		

	}

  ngOnInit(): void {
  }
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
		return false
	  }

	  

}
