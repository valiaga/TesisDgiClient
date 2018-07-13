import { Component, OnInit, Output, Input, EventEmitter, } from '@angular/core';
import { Location } from '@angular/common';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'dgi-sidenav',
  templateUrl: './sidenav.component.html',
  styles: []
})
export class SidenavComponent implements OnInit {
  // @Input() isSidenavOpened: boolean;
  // @Output() sidenavOpendedChange = new EventEmitter();

  public navGroups: any[] = [
    {
      Id: 1,
      Titulo: 'GENERAL',
      navItems: [
        { name: 'About', icon: 'info', route: 'about' },
        { name: 'Procesos', icon: 'view_list', route: 'procesos' },
        { name: 'Proyectos', icon: 'school', route: 'proyectos' },
        { name: 'Seguimiento', icon: 'cached', route: 'seguimientos' },
        { name: 'Asesores', icon: 'recent_actors', route: 'asesores' },
        { name: 'Dictaminadores', icon: 'recent_actors', route: 'dictaminadores' },
        { name: 'Jurados', icon: 'recent_actors', route: 'jurados' },
      ]
    },
    {
      Id: 2,
      Titulo: 'CONFIGURACIÓN',
      navItems: [
        { name: 'Lineas de investigación', icon: 'cached', route: 'linea-investigacions' },
        { name: 'Escuelas', icon: 'cached', route: 'escuelas' },
        { name: 'Personas', icon: 'account_box', route: 'personas' },
        { name: 'Configuración', icon: 'settings', route: 'config' },
        { name: 'Ayuda', icon: 'help', route: 'help' },
        { name: 'Usuarios', icon: 'beenhere', route: 'users' },
        { name: 'Perfiles', icon: 'beenhere', route: 'perfiles' },
        { name: 'Grupos', icon: 'beenhere', route: 'groups' },
        { name: 'Cerrar Sesión', icon: 'exit_to_app', route: 'logout' }
      ]
    }
  ];

  constructor(private location: Location,
    public media: TdMediaService) { }

  ngOnInit() {
    // this.sidenavOpendedChange.emit(this.isSidenavOpened);
  }

  public layoutClose() {
    console.log('Me da Click');
  }
}
