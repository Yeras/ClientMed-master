import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../../../@fuse/animations';
import {GradeSystem} from '../../../../../../core/models/grade-system';
import {GradeSystemService} from '../../../../../../core/service/grade-system-service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {GradeTeacherPoints} from '../../../../../../core/models/grade-teacher-points';
import {GradeTeacherPointsService} from '../../../../../../core/service/grade-teacher-points-service';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-teacher-rating-choose',
    templateUrl: './teacher-rating-choose.component.html',
    styleUrls: ['./teacher-rating-choose.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TeacherRatingChooseComponent implements OnInit {
    // @ Rating Information
    @Input() teacherId: number;
    @Input() typeOfGrade: string;
    @Output() backToInformation = new EventEmitter<string>();

    // @ Grade Information
    gradeSystemList: GradeSystem[] = [];
    userChooseGrade: number;
    userChooseGradeState: boolean;
    gradeTeacherPoint: GradeTeacherPoints = new GradeTeacherPoints();

    constructor(private _gradeSystemService: GradeSystemService, // @ Get information about grade
                private _gradeTeacherPointService: GradeTeacherPointsService, // @ Put grade
                private _modalService: MatDialog,
                private _router: Router,
                private _translateService: TranslateService,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        if (this.typeOfGrade === 'static') {
            this.getAllGradeInformation();
        }
        this.checkInputGrade(0);
    }


    /***
     * #1 Grade List for static grade choosing
     * */
    getAllGradeInformation(): void {
        this._gradeSystemService.getAllGrade().subscribe(res => {
            this.gradeSystemList = res;
        });
    }

    /***
     * #2 Input Grade check
     * */
    checkInputGrade(grade: number): void {
        if (grade > 100 || grade < 1) {
            this.userChooseGradeState = false;
        } else {
            this.userChooseGradeState = true;
        }
    }

    /***
     * #3 Choose Grade
     * */
    gradeChoose(): void {
        // @ Save university grade
        this.gradeTeacherPoint.gradePoint = this.userChooseGrade;
        this.gradeTeacherPoint.teacherUserId = this.teacherId;
        this.gradeTeacherPoint.userId = parseInt(localStorage.getItem('userId'));

        this._gradeTeacherPointService.putGrade(this.gradeTeacherPoint).subscribe(resGrade => {
            this._snackBar.open(this._translateService.instant('USER_INFORMATION_TEACHER_VIEW.THANK_YOU_FOR_GRADE'),
                this._translateService.instant('USER_INFORMATION_TEACHER_VIEW.SAVE'), {
                    duration: 1500,
                    verticalPosition: 'top'
                });
            this._modalService.closeAll();
        });
    }

    /***
     * #4 Back to information page
     * */
    backToInfoPage(): void {
        this.backToInformation.emit();
    }

}
