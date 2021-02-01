import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserNotificationComponent} from './user-notification.component';
import {UserNotificationRoutingModule} from './user-notification-routing.module';
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
import {MatNativeDateModule} from '@angular/material/core';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ToolbarModule} from '../../../layout/components/toolbar/toolbar.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [UserNotificationComponent, NotificationListComponent],
    imports: [
        CommonModule,
        UserNotificationRoutingModule,

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatButtonModule,
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

        InfiniteScrollModule,
        ToolbarModule,

        TranslateModule
    ]
})
export class UserNotificationModule {
}
