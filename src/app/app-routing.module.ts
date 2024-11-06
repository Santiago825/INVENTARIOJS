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

import { AuthGuard } from './guards/auth.guard';  // Asegúrate de importar el guard

const routes: Routes = [
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'h',
    component: BodyComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
      { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard] },
      { path: 'provedores', component: ProvedoresComponent, canActivate: [AuthGuard] },
      { path: 'puntos-venta', component: PuntosVentaComponent, canActivate: [AuthGuard] },
      { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
      { path: 'notificaciones', component: NotificacionesComponent, canActivate: [AuthGuard] },
      { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard] },
    ],
  },

  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
  