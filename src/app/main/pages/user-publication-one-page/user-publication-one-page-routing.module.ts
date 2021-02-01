import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserPublicationOnePageComponent} from './user-publication-one-page.component';

const routes: Routes = [
    {
        path: '',
        component: UserPublicationOnePageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserPublicationOnePageRoutingModule {

}
