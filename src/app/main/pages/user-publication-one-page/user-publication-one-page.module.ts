import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserPublicationOnePageComponent} from './user-publication-one-page.component';
import {UserPublicationOnePageRoutingModule} from './user-publication-one-page-routing.module';
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
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ToolbarModule} from '../../../layout/components/toolbar/toolbar.module';
import {TranslateModule} from '@ngx-translate/core';
import {UserInformationModule} from "../user-information/user-information.module";
import { PublicationOnePageViewComponent } from './publication-one-page-view/publication-one-page-view.component';
import { OnePageViewComponent } from './publication-one-page-view/one-page-view/one-page-view.component';


@NgModule({
    declarations: [UserPublicationOnePageComponent, PublicationOnePageViewComponent, OnePageViewComponent],
    imports: [
        CommonModule,
        UserPublicationOnePageRoutingModule,

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

        TranslateModule,
        UserInformationModule
    ]
})
export class UserPublicationOnePageModule {
}
