import {LoginComponent} from './login/login.component';
import {Routes} from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {UserActivationComponent} from './user-activation/user-activation.component';
import {GenerateNewTokenComponent} from './generate-new-token/generate-new-token.component';
import {OpenEmailMessageComponent} from './open-email-message/open-email-message.component';
import {OpenEmailChangePasswordComponent} from "./open-email-change-password/open-email-change-password.component";
import {UserActivationPasswordComponent} from "./user-activation-password/user-activation-password.component";

export const SessionsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: {title: 'Signin'}
            },
            {
                path: 'registration',
                component: RegistrationComponent
            },
            {
                path: 'forgot',
                component: ForgotPasswordComponent
            },
            {
                path: 'activation',
                component: UserActivationComponent
            },
            {
                path: 'generate',
                component: GenerateNewTokenComponent
            },
            {
                path: 'message',
                component: OpenEmailMessageComponent
            },
            {
                path: 'message-password',
                component: OpenEmailChangePasswordComponent
            },
            {
                path: 'activation-password',
                component: UserActivationPasswordComponent
            }
        ]
    }
];
