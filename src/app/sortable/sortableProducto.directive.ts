import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Producto} from '../model/productos';

export type SortColumn = keyof Producto | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortableProdu]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeaderProducto {
	@Input() sortableProdu: SortColumn = '';
	@Input() directionProdu: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();
  
	rotate() {
	  this.directionProdu = rotate[this.directionProdu];
	  this.sort.emit({column: this.sortableProdu, direction: this.directionProdu});
	}
  }
  
