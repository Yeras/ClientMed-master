import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserThinkAboutTeacherComponent} from './user-think-about-teacher.component';

const routes: Routes = [
    {
        path: '',
        component: UserThinkAboutTeacherComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserThinkAboutTeacherRoutingModule {

}
