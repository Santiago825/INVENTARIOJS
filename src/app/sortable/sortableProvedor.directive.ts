import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Proveedor} from '../model/proveedor';

export type SortColumnProve = keyof Proveedor | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumnProve;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeaderProvedor {
	@Input() sortableProve: SortColumnProve = '';
	@Input() directionProve: SortDirection = '';
	@Output() sortCate = new EventEmitter<SortEvent>();
  
	rotate() {
	  this.directionProve = rotate[this.directionProve];
	  this.sortCate.emit({column: this.sortableProve, direction: this.directionProve});
	}
  }
  