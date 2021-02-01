import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DoctorAppointmentComponent} from './doctor-appointment.component';

const routes: Routes = [
    {
        path: '',
        component: DoctorAppointmentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorAppointmentRoutingModule {
}
