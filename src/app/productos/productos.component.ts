import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren,OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {Productos} from '../model/productos';
import {CountryService} from '../services/country/country.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgbdSortableHeader, SortEvent} from '../sortable/sortable.directive';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [CountryService, DecimalPipe]
})
export class ProductosComponent implements OnInit {
	countries$: Observable<Productos[]>;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService,    public translate: TranslateService,
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
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}

	validarCampoObligatorio(campo: string): boolean {
		return false
	  }

	  

}
