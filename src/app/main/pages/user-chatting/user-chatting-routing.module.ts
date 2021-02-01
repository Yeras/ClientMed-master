import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserChattingComponent} from './user-chatting.component';

const routes: Routes = [
    {
        path: '',
        component: UserChattingComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserChattingRoutingModule {

}
