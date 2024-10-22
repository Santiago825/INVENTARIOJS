import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumnProve, SortDirection} from '../../../sortable/sortableProvedor.directive';
import { ProveedorService } from 'src/app/services/negocio/proveedor/proveedor.service';
import { Proveedor } from '../../../model/proveedor';
import { NgxSpinnerService } from "ngx-spinner";

interface SearchResult {
  countries: Proveedor[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumnProve;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: Proveedor[], column: SortColumnProve, direction: string): Proveedor[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: Proveedor, term: string, pipe: PipeTransform) {
  return country.nombreProveedor?.toLowerCase().includes(term.toLowerCase())||
  country.direccion?.toLowerCase().includes(term.toLowerCase())||
  country.email?.toLowerCase().includes(term.toLowerCase())||
  country.telefono?.toLowerCase().includes(term.toLowerCase())||
  country.nombreMunicipio?.toLowerCase().includes(term.toLowerCase())||
  country.estado?.toLowerCase().includes(term.toLowerCase())
  
}

@Injectable({providedIn: 'root'})

export class ProvedorSortService {

  listaProveedor:Proveedor[]=[];
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Proveedor[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, public proveedorService:ProveedorService,
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
    this.proveedorService.obtenerProveedor().subscribe(
      (response: any) => {
        this.listaProveedor = response['lista'];
        console.log("sueño");
        console.log(this.listaProveedor);

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
  set sortColumn(sortColumn: SortColumnProve) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let countries = sort(this.listaProveedor, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    const total = countries.length;

    // 3. paginate
    countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({countries, total});
  }
}

