import { NgModule } from '@angular/core';

import { GroupsRoutingModule, routedComponents } from './groups-routing.module';
import { GroupsService } from './shared/groups.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

const MATERIAL_MODULES: any[] = [
    CdkTableModule,
    MatTableModule,
];

@NgModule({
    imports: [
        CommonModule,
        GroupsRoutingModule,

        ...MATERIAL_MODULES,
    ],
    exports: [],
    declarations: [
        ...routedComponents,
    ],
    providers: [
        GroupsService,
    ],
})
export class GroupsModule { }
