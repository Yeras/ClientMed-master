import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserForgotPasswordComponent} from './user-forgot-password.component';

const routes: Routes = [
    {
        path: '',
        component: UserForgotPasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserForgotPasswordRoutingModule {

}
