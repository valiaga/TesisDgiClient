import { NgModule } from '@angular/core';

// import { UsersComponent } from './users.component';
import { UsersRoutingModule, routedComponents } from './users-routing.module';
import { UsersService } from './shared/users.service';
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
        UsersRoutingModule,

        ...MATERIAL_MODULES,
    ],
    exports: [],
    declarations: [
        ...routedComponents,
    ],
    providers: [
        UsersService,
    ],
})
export class UsersModule { }
