import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../../../@fuse/animations';
import {GradeSystemService} from '../../../../../../core/service/grade-system-service';
import {GradeSystem} from '../../../../../../core/models/grade-system';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {GradeUniversityPointsService} from '../../../../../../core/service/grade-university-points-service';
import {GradeUniversityPoints} from '../../../../../../core/models/grade-university-points';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-rating-choose',
    templateUrl: './rating-choose.component.html',
    styleUrls: ['./rating-choose.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RatingChooseComponent implements OnInit {
    // @ Rating Information
    @Input() universityId: number;
    @Input() typeOfGrade: string;
    @Output() backToInformation = new EventEmitter<string>();

    // @ Grade Information
    gradeSystemList: GradeSystem[] = [];
    userChooseGrade: number;
    userChooseGradeState: boolean;
    gradeUniversityPoint: GradeUniversityPoints = new GradeUniversityPoints();

    constructor(private _gradeSystemService: GradeSystemService, // @ Get information about grade
                private _gradeUniversityPointService: GradeUniversityPointsService, // @ Put grade
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
        this.gradeUniversityPoint.gradePoint = this.userChooseGrade;
        this.gradeUniversityPoint.universityUserId = this.universityId;
        this.gradeUniversityPoint.userId = parseInt(localStorage.getItem('userId'));

        this._gradeUniversityPointService.putGrade(this.gradeUniversityPoint).subscribe(resGrade => {
            this._snackBar.open(this._translateService.instant('USER_INFORMATION_UNIVERSITY_VIEW.THANK_YOU_FOR_GRADE'),
                this._translateService.instant('USER_INFORMATION_UNIVERSITY_VIEW.SAVE'), {
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
