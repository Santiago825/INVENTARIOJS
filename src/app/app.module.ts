import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';

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
import { NgbPaginationModule,NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeaderProducto } from './sortable/sortableProducto.directive';
import { NgbdSortableHeaderCategoria } from './sortable/sortableCategoria.directive';
import { NgbdSortableHeaderProvedor } from './sortable/sortableProvedor.directive';

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
import { NgxSpinnerModule } from "ngx-spinner";

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { HomeComponent } from './home/home.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    BodyComponent,
    DashboardComponent,
    SublevelMenuComponent,
    NgbdSortableHeaderProducto,
    NgbdSortableHeaderProvedor,
    NgbdSortableHeaderCategoria,
    ProductosComponent,
    CategoriasComponent,
    ProvedoresComponent,
    NotificacionesComponent,
    ClientesComponent,
    VentasComponent,
    PuntosVentaComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    HomeComponent,
    ProfileModalComponent
    
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgSelectModule,
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
    }), NgbModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}