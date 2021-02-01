import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {GradeObject} from '../../../../../core/models/grade-object';
import {GradeSystem} from '../../../../../core/models/grade-system';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GradeSystemService} from '../../../../../core/service/grade-system-service';
import {GradeTeacherPointsService} from '../../../../../core/service/grade-teacher-points-service';
import {TeacherInformationService} from '../../../../../core/service/teacher-information-service';

@Component({
    selector: 'app-teacher-rating',
    templateUrl: './teacher-rating.component.html',
    styleUrls: ['./teacher-rating.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TeacherRatingComponent implements OnInit {
    // @ Input variable
    teacherId: number;
    teacherNameInformation: string;

    // @ Putting Grade
    chooseGrade: boolean;
    typeOfGrade: string;

    // @ Grade Information
    gradeState: boolean;
    gradeObject: GradeObject = new GradeObject();

    // @ Grade System Information
    gradeSystemList: GradeSystem[] = [];
    displayedColumns = ['gradeName', 'points'];

    constructor(public activeModal: MatDialogRef<TeacherRatingComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private _gradeTeacherPointsService: GradeTeacherPointsService,
                private _gradeSystemService: GradeSystemService,
                private _teacherInformationService: TeacherInformationService) {
        this.teacherId = _data.teacherId;
    }

    ngOnInit(): void {
        // this.getTeacherInformation();
        this.hasOrNotGrade();
    }


    /***
     * #1 Information about teacher
     * */
    getTeacherInformation(): void {
        this._teacherInformationService.findByUserId(this.teacherId).subscribe(resTeacherInfo => {
            this.teacherNameInformation = resTeacherInfo.lastName + ' ' + resTeacherInfo.firstName;
        });
    }


    /***
     * #1 Check Local User choose grade or not
     * */
    hasOrNotGrade(): void {
        this._gradeTeacherPointsService.getTeacherGradeByUser(this.teacherId, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            if (res == null) {
                this.gradeState = false;
                this.getTeacherGradePoint();
            } else {
                this.gradeState = true;
                this.getTeacherGradePoint();
            }
        });
    }

    /***
     * #1 University Grade Points
     * */
    getTeacherGradePoint(): void {
        this._gradeTeacherPointsService.findTeacherFullGrade(this.teacherId).subscribe(resGrade => {
            if (resGrade !== null) {
                this.gradeObject = resGrade;
                this.getAllGradeInformation();
                this.getGradeName(resGrade.points);
            } else {
                this.gradeObject.points = 0;
                this.gradeObject.gradeName = 'F';
                this.gradeObject.userList = 0;
            }
        });
    }

    /***
     * #1 Grade Name
     * %points: grade points(number) - get grade name of points
     * */
    getGradeName(points: number): void {
        if (points >= 95 && points <= 100) {
            this.gradeObject.gradeName = 'A';
        } else if (points >= 90 && points < 95) {
            this.gradeObject.gradeName = 'A-';
        } else if (points >= 85 && points < 90) {
            this.gradeObject.gradeName = 'B+';
        } else if (points >= 80 && points < 85) {
            this.gradeObject.gradeName = 'B';
        } else if (points >= 75 && points < 80) {
            this.gradeObject.gradeName = 'B-';
        } else if (points >= 70 && points < 75) {
            this.gradeObject.gradeName = 'C+';
        } else if (points >= 65 && points < 70) {
            this.gradeObject.gradeName = 'C';
        } else if (points >= 60 && points < 65) {
            this.gradeObject.gradeName = 'C-';
        } else if (points >= 55 && points < 60) {
            this.gradeObject.gradeName = 'D+';
        } else if (points >= 51 && points < 55) {
            this.gradeObject.gradeName = 'D';
        } else if (points >= 49 && points < 51) {
            this.gradeObject.gradeName = 'D-';
        } else if (points < 49) {
            this.gradeObject.gradeName = 'F';
        }
    }

    /***
     * #1 Information about grade
     * */
    getAllGradeInformation(): void {
        this._gradeSystemService.getAllGrade().subscribe(res => {
            this.gradeSystemList = res;
        });
    }

    /***
     * ##2 Choose Type Of Grade Putting
     * */
    chooseStatic(): void {
        this.typeOfGrade = 'static';
        this.chooseGrade = true;
    }

    /***
     * ##2 Choose Type Of Grade Putting
     * */
    chooseCustom(): void {
        this.typeOfGrade = 'custom';
        this.chooseGrade = true;
    }

    /***
     * ##3 Back to grade information page
     * */
    backFromGradeChoose(): void {
        this.chooseGrade = false;
    }

}
