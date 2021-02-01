import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserFollowingFullComponent} from './user-following-full.component';

const routes: Routes = [
    {
        path: '',
        component: UserFollowingFullComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserFollowingFullRoutingModule {

}
