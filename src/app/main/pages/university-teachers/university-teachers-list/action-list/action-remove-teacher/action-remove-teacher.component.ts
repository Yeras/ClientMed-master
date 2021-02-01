import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeacherInformationService} from '../../../../../../core/service/teacher-information-service';
import {TeacherInfo} from '../../../../../../core/models/teacher-info';

@Component({
    selector: 'app-action-remove-teacher',
    templateUrl: './action-remove-teacher.component.html',
    styleUrls: ['./action-remove-teacher.component.scss']
})
export class ActionRemoveTeacherComponent implements OnInit {
    // @Input Param
    teacherId: number;

    // @Teacher Information
    teacherInformationObject: TeacherInfo = new TeacherInfo();

    constructor(public activeModal: MatDialogRef<ActionRemoveTeacherComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private _teacherInformationService: TeacherInformationService) {
        this.teacherId = _data.teacherId;
    }

    ngOnInit(): void {
        this.getTeacherInformation();
    }


    /***
     * @TeacherId - main input param
     * #1 Information About Teacher
     * */
    getTeacherInformation(): void {
        this._teacherInformationService.findByUserId(this.teacherId).subscribe(res => {
            this.teacherInformationObject = res;
        });
    }

}
