import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

/** Importación de los componentes enrutables */
import { NuevoComponent } from './nuevo/nuevo.component';
import { EditorComponent } from './editor/editor.component';
import { FindProcesoPageComponent } from './containers/find-proceso-page.component';
import { TareasListComponent } from './components/tareas';
import { ProcesosComponent } from './procesos.component';
import { FormulariosListComponent } from './components/formularios';

/** Rutas que se manejan en este módulo
 * /procesos
 * /procesos/nuevo
 * /procesos/lista
 * /procesos/42
 */
const routes: Routes = [
  {
    path: '',
    component: ProcesosComponent, // tiene sus cosas y ... un router-oulet para sus hijos
    children: [ // rutas hijas, se verán dentro del router-oulet componente contenedor
      {
        path: '',
        component: FindProcesoPageComponent,
      },
      {
        path: 'nuevo', // la ruta real es procesos/nuevo
        component: NuevoComponent, // se verá dentro del router-oulet principal,
      },
      {
        path: ':id', // parámetro variable id
        component: EditorComponent, // se verá dentro del router-oulet principal
      },
      {
        path: ':id/etapas/:etapaId',
        component: TareasListComponent,
      },
      {
        path: ':id/etapas/:etapaId/tareas',
        component: TareasListComponent,
      },
      {
        path: ':id/etapas/:etapaId/tareas/:tareaId',
        component: FormulariosListComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)], // configuración para un módulo hijo
  exports: [RouterModule], // se importará en su módulo funcional asociado
  providers: [],
})
export class ProcesosRoutingModule { }
