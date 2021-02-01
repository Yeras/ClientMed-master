import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdmNotFoundComponent} from './adm-not-found.component';

const routes: Routes = [
    {
        path: '',
        component: AdmNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdmNotFoundRoutingModule {

}
