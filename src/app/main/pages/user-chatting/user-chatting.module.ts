import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserChattingComponent} from './user-chatting.component';
import {UserChattingRoutingModule} from './user-chatting-routing.module';
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
import {ChattingListComponent} from './chatting-list/chatting-list.component';
import {ViewChattingComponent} from './chatting-list/view-chatting/view-chatting.component';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ChattingDeleteAskComponent} from './chatting-list/view-chatting/chatting-delete-ask/chatting-delete-ask.component';
import {ToolbarModule} from '../../../layout/components/toolbar/toolbar.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [UserChattingComponent, ChattingListComponent, ViewChattingComponent, ChattingDeleteAskComponent],
    imports: [
        CommonModule,
        UserChattingRoutingModule,

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

        MatCardModule,
        MatListModule,
        MatRadioModule,
        MatSidenavModule,
        InfiniteScrollModule,
        ToolbarModule,

        TranslateModule
    ],
    entryComponents: [ChattingDeleteAskComponent]
})
export class UserChattingModule {
}
