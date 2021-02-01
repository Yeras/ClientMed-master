import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../core/services/auth.service';
import {RouterModule} from '@angular/router';
import {SessionsRoutes} from './authentication-routing.module';
import {LoginComponent} from './login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';
import {TermsAndConditionsInformationComponent} from './terms-and-conditions/terms-and-conditions-information/terms-and-conditions-information.component';
import {UserActivationComponent} from './user-activation/user-activation.component';
import {GenerateNewTokenComponent} from './generate-new-token/generate-new-token.component';
import {OpenEmailMessageComponent} from './open-email-message/open-email-message.component';
import {TranslateModule} from '@ngx-translate/core';
import { OpenEmailChangePasswordComponent } from './open-email-change-password/open-email-change-password.component';
import { UserActivationPasswordComponent } from './user-activation-password/user-activation-password.component';


@NgModule({
    declarations: [LoginComponent, RegistrationComponent, ForgotPasswordComponent, TermsAndConditionsComponent,
        TermsAndConditionsInformationComponent, UserActivationComponent, GenerateNewTokenComponent, OpenEmailMessageComponent, OpenEmailChangePasswordComponent, UserActivationPasswordComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(SessionsRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
        FuseSharedModule,

        TranslateModule
    ],
    providers: [AuthService],
    entryComponents: [TermsAndConditionsComponent]
})
export class AuthenticationModule {
}
