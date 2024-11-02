import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PuntosVentaComponent } from './puntos-venta/puntos-venta.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VentasComponent } from './ventas/ventas.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { ProvedoresComponent } from './provedores/provedores.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'h',
    component: BodyComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'provedores', component: ProvedoresComponent },
      { path: 'puntos-venta', component: PuntosVentaComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: 'ventas', component: VentasComponent },
    ],
  },

  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
