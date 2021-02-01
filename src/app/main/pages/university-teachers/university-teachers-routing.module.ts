import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UniversityTeachersComponent} from './university-teachers.component';

const routes: Routes = [
    {
        path: '',
        component: UniversityTeachersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UniversityTeachersRoutingModule {

}
