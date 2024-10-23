import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from '../../../sortable/sortableProducto.directive';
import { ProductosService } from 'src/app/services/negocio/productos/productos.service';
import { Producto } from '../../../model/productos';
import { NgxSpinnerService } from "ngx-spinner";

interface SearchResult {
  countries: Producto[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: Producto[], column: SortColumn, direction: string): Producto[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: Producto, term: string, pipe: PipeTransform) {
  return country.nombreProducto.toLowerCase().includes(term.toLowerCase())||
  country.nombreCategoria.toLowerCase().includes(term.toLowerCase())||
  country.estadoProducto.toLowerCase().includes(term.toLowerCase())||
  pipe.transform(country.precioProducto).includes(term)||
  pipe.transform(country.cantidadProducto).includes(term)

  
}

@Injectable({providedIn: 'root'})

export class ProdcutosSortService {

  listaCategorias:Producto[]=[];
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Producto[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, public productosService:ProductosService,
    private spinner: NgxSpinnerService

  ) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);
      this._total$.next(result.total);
    });

    this._search$.next();
    this.obtenerCategorias()
  }

  obtenerCategorias() {
    this.spinner.show();
    this.productosService.obtenerProductos().subscribe(
      (response: any) => {
        this.listaCategorias = response['lista'];
        this.spinner.hide();
      },
      (error: any) => {
        this.spinner.hide();
       
      }
    );
  }

  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let countries = sort(this.listaCategorias, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    const total = countries.length;

    // 3. paginate
    countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({countries, total});
  }
}

