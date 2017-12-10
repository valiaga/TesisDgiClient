import { TesisProceso } from './shared/tesis-proceso';
import { TesisProcesoService } from './shared/tesis-proceso.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogNuevoTeProcesoComponent } from './dialog-nuevo-teproceso.component';


@Component({
  selector: 'dgi-tesis-procesos',
  templateUrl: './tesis-procesos.component.html',
  styleUrls: ['./tesis-procesos.component.scss']
})
export class TesisProcesosComponent implements OnInit {

  public tesisProceso: TesisProceso[] = []
  public proceso_id: string = '';

  constructor(private route: ActivatedRoute, 
              private tesisProcesoService: TesisProcesoService,
              private dialog: MatDialog) { }

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

  getProyectos(proceso_id) {
    this.tesisProcesoService.getProyectosByProcesoId(proceso_id)
      .then(res => {
        // this.tesisProceso = res.results;
        this.tesisProceso = res;
      })
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
    // data.proceso_id=this.proceso_id;
    data.proceso=this.proceso_id;
    this.tesisProcesoService.saveTesisProcesoAndProyecto(data);

    // .then(res => {
    //   // this.tesisProceso = res.results;
    //   console.log("Holaa save")
    // })
    console.log(data);
  }
}

