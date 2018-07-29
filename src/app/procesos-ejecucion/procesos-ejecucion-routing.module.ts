import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListProcesoPageComponent, FindTesisProcesoPageComponent } from './containers';
import { ProcesosEjecucionComponent } from './procesos-ejecucion.component';
// import { TesisProcesoListComponent } from './components';

/** Rutas que se manejan en este módulo
 * /procesos-ejecucion
 * /procesos-ejecucion/42
 */
const routes: Routes = [
  {
    path: '',
    component: ProcesosEjecucionComponent,
    children: [ // rutas hijas, se verán dentro del router-oulet componente contenedor
      {
        path: '',
        component: ListProcesoPageComponent, // tiene sus cosas y ... un router-oulet para sus hijos
      },
      {
        path: ':proceso_id',
        component: FindTesisProcesoPageComponent, // tiene sus cosas y ... un router-oulet para sus hijos
      },
      // {
      //   path: ':proceso_id',
      //   loadChildren: './tesis-procesos/tesis-procesos.module#TesisProcesosModule',
      // }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)], // configuración para un módulo hijo
  exports: [RouterModule], // se importará en su módulo funcional asociado
  providers: []
})
export class ProcesosEjecucionRoutingModule { }
