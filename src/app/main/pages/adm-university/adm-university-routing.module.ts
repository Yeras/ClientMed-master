import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdmUniversityComponent} from './adm-university.component';

const routes: Routes = [
    {
        path: '',
        component: AdmUniversityComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdmUniversityRoutingModule {

}
