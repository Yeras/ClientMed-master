import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientAppointService} from "../../../../core/medService/patient-appoint-service";
import {PatientAppointmentModel} from "../../../../core/medModels/patient-appointment-model";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentStartSendComponent} from "./appointment-start-send/appointment-start-send.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-appointment-create',
    templateUrl: './appointment-create.component.html',
    styleUrls: ['./appointment-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AppointmentCreateComponent implements OnInit {
    // @ Appointment send form
    appointmentForm: FormGroup;

    // @ Patient Information Sending
    patientAppointmentObject: PatientAppointmentModel = new PatientAppointmentModel();

    constructor(private _formBuilder: FormBuilder,
                private _patientAppointmentService: PatientAppointService,
                private _modalService: MatDialog,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.appointmentForm = this.getRegistrationForm();
    }


    /***
     * #1 Registration form
     * */
    getRegistrationForm(): FormGroup {
        return this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            fathersName: [''],
            patientBirthday: [''],
            patientPhone: ['', Validators.required],
            patientEmail1: ['', [Validators.required, Validators.email]],
            patientEmail2: ['', Validators.email],
            appointmentList: ['', Validators.required],
            startSendMessageDate: ['', Validators.required],
            howManyTimesInDay: ['', Validators.required],
            howLongDrinkMedicine: ['', Validators.required],
            doctorPhoneNumber: [''],
            doctorWorkNumber: [''],
            doctorEmail: ['']
        });
    }

    /***
     * #2 Save appointment for patient
     * */
    saveAppointment(): void {
        this.patientAppointmentObject.doctorId = parseInt(localStorage.getItem('userId'));

        if (this.patientAppointmentObject.howManyTimesDay < 0 || this.patientAppointmentObject.howManyTimesDay > 10) {
            this._snackBar.open('Error',
                'No more 10 and no less than 0', {
                    duration: 3000,
                    verticalPosition: 'top'
                });
        } else {
            this._patientAppointmentService.checkAppointmentList(this.patientAppointmentObject).subscribe(res => {
                console.log('Appointment send: ', res);
            });
            this._modalService.open(AppointmentStartSendComponent).afterClosed().subscribe(resModal => {
                if (resModal) {
                    this._patientAppointmentService.saveAppoint(this.patientAppointmentObject).subscribe(res => {
                        console.log(res);
                    });
                }
            });
        }
    }

}
