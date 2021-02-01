import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../../../@fuse/animations';

@Component({
    selector: 'app-rating-ready',
    templateUrl: './rating-ready.component.html',
    styleUrls: ['./rating-ready.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RatingReadyComponent implements OnInit {
    // @ Input grade Information
    gradePoint: number;
    typeOfGrade: string;

    // @ Grade Information
    gradeName: string;

    constructor(public activeModal: MatDialogRef<RatingReadyComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any) {
        this.gradePoint = _data.gradePoint;
        this.typeOfGrade = _data.typeOfGrade;
    }

    ngOnInit(): void {
        this.getGradeName();
    }


    /***
     * #1 With grade, getting grade name
     * */
    getGradeName(): void {
        if (this.gradePoint >= 95 && this.gradePoint <= 100) {
            this.gradeName = 'A';
        } else if (this.gradePoint >= 90 && this.gradePoint <= 94) {
            this.gradeName = 'A-';
        } else if (this.gradePoint >= 85 && this.gradePoint <= 89) {
            this.gradeName = 'B+';
        } else if (this.gradePoint >= 80 && this.gradePoint <= 84) {
            this.gradeName = 'B';
        } else if (this.gradePoint >= 75 && this.gradePoint <= 79) {
            this.gradeName = 'B-';
        } else if (this.gradePoint >= 70 && this.gradePoint <= 74) {
            this.gradeName = 'C+';
        } else if (this.gradePoint >= 65 && this.gradePoint <= 69) {
            this.gradeName = 'C';
        } else if (this.gradePoint >= 60 && this.gradePoint <= 64) {
            this.gradeName = 'C-';
        } else if (this.gradePoint >= 55 && this.gradePoint <= 59) {
            this.gradeName = 'D+';
        } else if (this.gradePoint >= 51 && this.gradePoint <= 54) {
            this.gradeName = 'D';
        } else if (this.gradePoint >= 49 && this.gradePoint <= 50) {
            this.gradeName = 'D-';
        } else if (this.gradePoint <= 48) {
            this.gradeName = 'F';
        }
    }

}
