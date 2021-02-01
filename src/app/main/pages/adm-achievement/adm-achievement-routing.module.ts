import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdmAchievementComponent} from './adm-achievement.component';

const routes: Routes = [
    {
        path: '',
        component: AdmAchievementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdmAchievementRoutingModule {

}
