import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserForgotPasswordComponent} from './user-forgot-password.component';
import {UserForgotPasswordRoutingModule} from './user-forgot-password-routing.module';
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
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {UserSettingsDeactivateComponent} from './user-settings/user-settings-deactivate/user-settings-deactivate.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ChangePasswordComponent} from './user-settings/change-password/change-password.component';
import {ChangeLanguageComponent} from './user-settings/change-language/change-language.component';
import {languageList} from '../../../core/constant/language-constant-list';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [UserForgotPasswordComponent, UserSettingsComponent, UserSettingsDeactivateComponent, ChangePasswordComponent, ChangeLanguageComponent],
    imports: [
        CommonModule,
        UserForgotPasswordRoutingModule,

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
        MatCheckboxModule,

        InfiniteScrollModule,
        ToolbarModule,

        TranslateModule
    ],
    providers: [
        // CONSTANT LANGUAGE
        {provide: 'LANGUAGE-LIST', useValue: languageList}
    ],
})
export class UserForgotPasswordModule {
}
