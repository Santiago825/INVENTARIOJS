import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Categorias} from '../model/categorias';

export type SortColumnCate = keyof Categorias | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumnCate;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortableCate]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeaderCategoria {
	@Input() sortableCate: SortColumnCate = '';
	@Input() directionCate: SortDirection = '';
	@Output() sortCate = new EventEmitter<SortEvent>();
  
	rotate() {
	  this.directionCate = rotate[this.directionCate];
	  this.sortCate.emit({column: this.sortableCate, direction: this.directionCate});
	}
  }
  
