import { NgModule } from '@angular/core';

// import { RequisitosComponent } from './requisitos.components';
import { RequisitosRoutingModule, routedComponents } from './requisitos-routing.module';
import { RequisitosService, RequisitoReactiveService } from './shared/requisitos.service';

@NgModule({
    imports: [
        RequisitosRoutingModule,
    ],
    exports: [],
    declarations: [
        ...routedComponents,
    ],
    providers: [
        RequisitosService,
        RequisitoReactiveService,
    ],
})
export class NameModule { }
