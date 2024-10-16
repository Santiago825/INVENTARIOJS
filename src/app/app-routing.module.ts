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

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'provedores', component: ProvedoresComponent},
  {path: 'puntos-venta', component: PuntosVentaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'notificaciones', component: NotificacionesComponent},
  {path: 'ventas', component: VentasComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
