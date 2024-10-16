import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { SublevelMenuComponent } from './layout/sidenav/sublevel-menu.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule,NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './sortable/sortable.directive';
import { NgbdSortableHeaderCategoria } from './sortable/sortableCategoria.directive';

import { CategoriasComponent } from './categorias/categorias.component';
import { ProvedoresComponent } from './provedores/provedores.component';
import {OverlayModule} from '@angular/cdk/overlay'
import {CdkMenuModule} from '@angular/cdk/menu';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VentasComponent } from './ventas/ventas.component';
import { PuntosVentaComponent } from './puntos-venta/puntos-venta.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    BodyComponent,
    DashboardComponent,
    SublevelMenuComponent,
    NgbdSortableHeader,
    NgbdSortableHeaderCategoria,
    ProductosComponent,
    CategoriasComponent,
    ProvedoresComponent,
    NotificacionesComponent,
    ClientesComponent,
    VentasComponent,
    PuntosVentaComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    OverlayModule,
    CdkMenuModule,
    HttpClientModule, // Asegúrate de que HttpClientModule esté importado
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}