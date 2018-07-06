import { NgModule } from '@angular/core';

import { DgiButtonFabComponent } from './button-fab.component';
import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
    exports: [DgiButtonFabComponent],
    declarations: [DgiButtonFabComponent],
    providers: [],
})
export class DgiButtonFabModule { }
