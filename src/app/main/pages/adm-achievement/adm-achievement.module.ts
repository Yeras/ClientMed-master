import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdmAchievementComponent} from './adm-achievement.component';
import {AdmAchievementRoutingModule} from './adm-achievement-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseConfirmDialogModule, FuseSidebarModule, FuseWidgetModule} from '../../../../@fuse/components';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TranslateModule} from '@ngx-translate/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AchievementRegistrationComponent} from './achievement-registration/achievement-registration.component';
import {ToolbarModule} from '../../../layout/components/toolbar/toolbar.module';

@NgModule({
    declarations: [AdmAchievementComponent, AchievementRegistrationComponent],
    imports: [
        CommonModule,
        AdmAchievementRoutingModule,

        NgbModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,

        MatDividerModule,
        MatSelectModule,
        MatTabsModule,
        NgxChartsModule,
        FuseWidgetModule,
        TranslateModule,
        MatTooltipModule,
        ToolbarModule

    ]
})
export class AdmAchievementModule {
}
