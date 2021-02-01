import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserFollowersFullComponent} from './user-followers-full.component';

const routes: Routes = [
    {
        path: '',
        component: UserFollowersFullComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserFollowersFullRoutingModule {

}
