import { NgModule } from '@angular/core';

import { DgiButtonFabComponent } from './button-fab.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,
    ],
    exports: [DgiButtonFabComponent],
    declarations: [DgiButtonFabComponent],
    providers: [],
})
export class DgiButtonFabModule { }
