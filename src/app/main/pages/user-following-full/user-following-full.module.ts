import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserFollowingFullComponent} from './user-following-full.component';
import {UserFollowingFullRoutingModule} from './user-following-full-routing.module';
import {UserFollowingListComponent} from './user-following-list/user-following-list.component';
import {FullFollowingActionListComponent} from './user-following-list/full-following-action-list/full-following-action-list.component';
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
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ToolbarModule} from '../../../layout/components/toolbar/toolbar.module';

@NgModule({
    declarations: [UserFollowingFullComponent, UserFollowingListComponent, FullFollowingActionListComponent],
    imports: [
        CommonModule,
        UserFollowingFullRoutingModule,

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
    ]
})
export class UserFollowingFullModule {

}
