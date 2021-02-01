import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-appointment-start-send',
    templateUrl: './appointment-start-send.component.html',
    styleUrls: ['./appointment-start-send.component.scss']
})
export class AppointmentStartSendComponent implements OnInit {

    constructor(public activeModal: MatDialogRef<AppointmentStartSendComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
    }

}
