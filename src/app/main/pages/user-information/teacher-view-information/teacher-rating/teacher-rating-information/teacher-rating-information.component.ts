import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../../../@fuse/animations';
import {GradeSystem} from '../../../../../../core/models/grade-system';
import {GradeSystemService} from '../../../../../../core/service/grade-system-service';

@Component({
    selector: 'app-teacher-rating-information',
    templateUrl: './teacher-rating-information.component.html',
    styleUrls: ['./teacher-rating-information.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TeacherRatingInformationComponent implements OnInit {

    // @ Grade Information
    gradeSystemList: GradeSystem = new GradeSystem();
    displayedColumns = ['gradeName', 'points'];

    // @ Grade Stat Information
    gradeInformation: boolean;
    gradeDetail: boolean;
    customGradeDetail: boolean;


    constructor(private _gradeSystemService: GradeSystemService) {
    }

    ngOnInit(): void {
        this.gradeInformation = true;
        this.getAllGradeInformation();
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
     * #2 Open Information about grade
     * */
    openGradeInformation(): void {
        this.gradeDetail = true;
        this.gradeInformation = false;
    }

    /***
     * #2 Open Information about custom grade
     * */
    openCustomGradeInformation(): void {
        this.customGradeDetail = true;
        this.gradeInformation = false;
    }

    /***
     * #3 Open Main Information about grade
     * */
    backToMainInfoPage(): void {
        this.gradeInformation = true;
        this.gradeDetail = false;
        this.customGradeDetail = false;
    }

}
