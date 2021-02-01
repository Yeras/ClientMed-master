import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeacherAboutThink} from '../../../../core/models/teacher-about-think';
import {TeacherAboutThinkService} from '../../../../core/service/teacher-about-think-service';

@Component({
    selector: 'app-user-think-write-about',
    templateUrl: './user-think-write-about.component.html',
    styleUrls: ['./user-think-write-about.component.scss']
})
export class UserThinkWriteAboutComponent implements OnInit {
    // @ Modal Parameter
    teacherId: number;

    // @ Message To Save
    teacherAboutThinkObject: TeacherAboutThink = new TeacherAboutThink();

    constructor(public activeModal: MatDialogRef<UserThinkWriteAboutComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _teacherAboutThinkService: TeacherAboutThinkService) {
        this.teacherId = data.userId;
    }

    ngOnInit(): void {
    }


    /***
     * ##1 Save (Incognito)
     * */
    saveDataIncognito(): void {
        this.teacherAboutThinkObject.incognitoUserStat = 1;
        this.teacherAboutThinkObject.teacherId = this.teacherId;
        this.teacherAboutThinkObject.userId = parseInt(localStorage.getItem('userId'));

        setTimeout(() => {
            this._teacherAboutThinkService.saveNoIncognito(this.teacherAboutThinkObject).subscribe(res => {
                this.activeModal.close(res.id);
            });
        }, 50);
    }

    /***
     * ##1 Save (NO incognito)
     * */
    saveDataNoIncognito(): void {
        this.teacherAboutThinkObject.incognitoUserStat = 0;
        this.teacherAboutThinkObject.teacherId = this.teacherId;
        this.teacherAboutThinkObject.userId = parseInt(localStorage.getItem('userId'));

        setTimeout(() => {
            this._teacherAboutThinkService.saveNoIncognito(this.teacherAboutThinkObject).subscribe(res => {
                this.activeModal.close(res.id);
            });
        }, 50);
    }

}
