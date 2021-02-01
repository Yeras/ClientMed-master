import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ImgSecurePipe} from '../../../core/pipes/ImgSecurePipe';

@NgModule({
    declarations: [
        ToolbarComponent,
        ImgSecurePipe
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatTooltipModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        TranslateModule
    ],
    exports     : [
        ToolbarComponent,
        ImgSecurePipe
    ]
})
export class ToolbarModule
{
}
