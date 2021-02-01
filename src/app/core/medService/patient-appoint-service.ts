import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PatientAppointmentModel} from '../medModels/patient-appointment-model';

@Injectable({
    providedIn: 'root'
})
export class PatientAppointService {

    constructor(private http: HttpClient) {
    }

    /***
     * Token header
     * */
    private httpOptions(): HttpHeaders {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }


    checkAppointmentList(patientAppointment: PatientAppointmentModel): Observable<any> {
        return this.http.post('/appointment-service/patient/appointment/message', patientAppointment, {headers: this.httpOptions()});
    }

    saveAppoint(patientAppointment: PatientAppointmentModel): Observable<any> {
        return this.http.post('/appointment-service/patient/appointment', patientAppointment, {headers: this.httpOptions()});
    }

}
