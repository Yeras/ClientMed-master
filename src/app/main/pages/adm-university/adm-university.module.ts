import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdmUniversityComponent} from './adm-university.component';
import {AdmUniversityRoutingModule} from './adm-university-routing.module';
import {AdmUniversityListComponent} from './adm-university-list/adm-university-list.component';
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
import {UniversitiesViewModule} from '../universities-view/universities-view.module';
import {UniversityRegistrationComponent} from './adm-university-list/university-registration/university-registration.component';
import {ToolbarModule} from '../../../layout/components/toolbar/toolbar.module';

@NgModule({
    declarations: [AdmUniversityComponent, AdmUniversityListComponent, UniversityRegistrationComponent],
    imports: [
        CommonModule,
        AdmUniversityRoutingModule,

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
        UniversitiesViewModule,
        ToolbarModule
    ]
})
export class AdmUniversityModule {
}
