import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {GradeUniversityPointsService} from '../../../../../core/service/grade-university-points-service';
import {GradeObject} from '../../../../../core/models/grade-object';
import {GradeSystemService} from '../../../../../core/service/grade-system-service';
import {GradeSystem} from '../../../../../core/models/grade-system';
import {UniversityInfoListPage} from '../../../../../core/models/university-info-list-page';

@Component({
    selector: 'app-university-rating',
    templateUrl: './university-rating.component.html',
    styleUrls: ['./university-rating.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UniversityRatingComponent implements OnInit {
    // @ Input variable
    universityId: number;

    // @ Putting Grade
    chooseGrade: boolean;
    typeOfGrade: string;

    // @ Grade Information
    gradeState: boolean;
    myGradePoint: number;
    myGradeName: string;
    // gradeObject: GradeObject = new GradeObject();

    gradeObject: UniversityInfoListPage = new UniversityInfoListPage();

    // @ Grade System Information
    gradeSystemList: GradeSystem[] = [];
    displayedColumns = ['gradeName', 'points'];

    constructor(public activeModal: MatDialogRef<UniversityRatingComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private _gradeUniversityPointsService: GradeUniversityPointsService,
                private _gradeSystemService: GradeSystemService) {
        this.universityId = _data.universityId;
    }

    ngOnInit(): void {
        this.hasOrNotGrade();
    }


    /***
     * #1 Check Local User choose grade or not
     * */
    hasOrNotGrade(): void {
        this._gradeUniversityPointsService.getUniversityGradeByUser(this.universityId, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            if (res == null) {
                this.gradeState = false;
                this.myGradePoint = 0;
                this.getUniversityGradePoint();
            } else {
                this.gradeState = true;
                this.myGradePoint = res.gradePoint;
                this.getGradeName(this.myGradePoint);
                this.getUniversityGradePoint();
            }
        });
    }

    /***
     * #1 University Grade Points
     * */
    getUniversityGradePoint(): void {
        this._gradeUniversityPointsService.findUniversityFullGrade(this.universityId).subscribe(resGrade => {
            this.gradeObject = resGrade;
            this.getAllGradeInformation();
        });
    }

    /***
     * #1 Grade Name
     * %points: grade points(number) - get grade name of points
     * */
    getGradeName(points: number): void {
        if (points >= 95 && points <= 100) {
            this.myGradeName = 'A';
        } else if (points >= 90 && points < 95) {
            this.myGradeName = 'A-';
        } else if (points >= 85 && points < 90) {
            this.myGradeName = 'B+';
        } else if (points >= 80 && points < 85) {
            this.myGradeName = 'B';
        } else if (points >= 75 && points < 80) {
            this.myGradeName = 'B-';
        } else if (points >= 70 && points < 75) {
            this.myGradeName = 'C+';
        } else if (points >= 65 && points < 70) {
            this.myGradeName = 'C';
        } else if (points >= 60 && points < 65) {
            this.myGradeName = 'C-';
        } else if (points >= 55 && points < 60) {
            this.myGradeName = 'D+';
        } else if (points >= 51 && points < 55) {
            this.myGradeName = 'D';
        } else if (points >= 49 && points < 51) {
            this.myGradeName = 'D-';
        } else if (points < 49) {
            this.myGradeName = 'F';
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
