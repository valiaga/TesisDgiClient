import { TesisProceso } from './shared/tesis-proceso';
import { TesisProcesoService } from './shared/tesis-proceso.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogNuevoTeProcesoComponent } from './dialog-nuevo-teproceso.component';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'dgi-tesis-procesos',
  templateUrl: './tesis-procesos.component.html',
  styleUrls: ['./tesis-procesos.component.scss']
})
export class TesisProcesosComponent implements OnInit {

  private tesisProcesos$: Observable<TesisProceso[]>
  public proceso_id: string = '';

  constructor(private route: ActivatedRoute, 
              private tesisProcesoService: TesisProcesoService,
              private dialog: MatDialog) { }
              
  // La carga de datos se hace al iniciarse el componente
  // este es el lugar donde programar lógica de inicio
  // nunca en el constructor
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.proceso_id = params['proceso_id'];
      if (this.proceso_id){
        this.getProyectos(this.proceso_id.toString());
      } else {
        console.log('No hay parametros');
      }
    });
  }

  getProyectos(proceso_id: string) {
    this.tesisProcesos$ = this.tesisProcesoService.getProyectosByProcesoId(proceso_id);
  }

  openDialog():void{
    let dialogRef = this.dialog.open(DialogNuevoTeProcesoComponent, {
      width: '500px',
      // data: {
      //   proyectoNombre: '...'
      // }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('El dialog se cerro ops');
      // console.log(result);
      if(result && result.submit){
        this.guardarTesisProceso(result.realData);
      }else{
        console.log('has cancel')
        console.log(result && result.realData)
      }
    });
  }

  guardarTesisProceso(data){
    data.proceso=this.proceso_id;
    this.tesisProcesoService
      .saveTesisProcesoAndProyecto(data)
      .subscribe(res => {
        // console.log(res.json())
      });
    console.log(data);
  }
}

