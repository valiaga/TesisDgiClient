// import { ProyectosComponent } from '../proyectos/proyectos.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

/** Importación de los componentes enrutables */
// import { SeguimientoComponent } from "./seguimiento.component";
import { ListProcesoPageComponent } from './containers/list-proceso-page.component';
// import { ProcesosComponent } from './procesos/procesos.component';

/** Rutas que se manejan en este módulo
 * /seguimientos
 * /seguimientos/42
 */
const routes: Routes = [
  {
    path: '',
    component: ListProcesoPageComponent, // tiene sus cosas y ... un router-oulet para sus hijos
    children: [ // rutas hijas, se verán dentro del router-oulet componente contenedor
      // {
      //   path: 'lista', // se ven dentro del componente ProcesosComponent
      //   component: ListaComponent
      // },
      // {
      //   path: 'nuevo', // la ruta real es procesos/nuevo
      //   component: NuevoComponent
      // }
    ],
  },
  // {
  //   path: ':id', // parámetro variable id
  //   component: ProyectosComponent // se verá dentro del router-oulet principal
  // },
  {
    path: ':proceso_id',
    loadChildren: '../tesis-procesos/tesis-procesos.module#TesisProcesosModule',
    // data: {
      // title: 'Auth'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)], // configuración para un módulo hijo
  exports: [RouterModule], // se importará en su módulo funcional asociado
  providers: []
})
export class SeguimientosRoutingModule { }