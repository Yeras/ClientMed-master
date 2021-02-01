import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UniversityTeachersComponent} from './university-teachers.component';
import {UniversityTeachersRoutingModule} from './university-teachers-routing.module';
import {UniversityTeachersListComponent} from './university-teachers-list/university-teachers-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FuseConfirmDialogModule, FuseSidebarModule, FuseWidgetModule} from '../../../../@fuse/components';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TranslateModule} from '@ngx-translate/core';
import {ActionListComponent} from './university-teachers-list/action-list/action-list.component';
import {ActionRemoveTeacherComponent} from './university-teachers-list/action-list/action-remove-teacher/action-remove-teacher.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ToolbarModule} from '../../../layout/components/toolbar/toolbar.module';

@NgModule({
    declarations: [UniversityTeachersComponent, UniversityTeachersListComponent, ActionListComponent, ActionRemoveTeacherComponent],
    imports: [
        CommonModule,
        UniversityTeachersRoutingModule,

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatMenuModule,
        MatToolbarModule,

        FuseSharedModule,

        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatNativeDateModule,

        NgbModule,
        MatCheckboxModule,
        MatRippleModule,
        MatTableModule,
        MatPaginatorModule,

        FuseConfirmDialogModule,
        FuseSidebarModule,

        NgxChartsModule,
        FuseWidgetModule,
        TranslateModule,
        InfiniteScrollModule,
        ToolbarModule
    ],
    entryComponents: [ActionRemoveTeacherComponent]
})
export class UniversityTeachersModule {
}
