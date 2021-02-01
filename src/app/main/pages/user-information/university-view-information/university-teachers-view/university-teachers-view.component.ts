import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {TeacherInfo} from '../../../../../core/models/teacher-info';
import {TeacherWorkPlaceService} from '../../../../../core/service/teacher-work-place-service';

@Component({
    selector: 'app-university-teachers-view',
    templateUrl: './university-teachers-view.component.html',
    styleUrls: ['./university-teachers-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UniversityTeachersViewComponent implements OnInit {
    // Input params
    @Input() universityId: number;

    // @ Teacher information view list
    teacherInformationList: TeacherInfo[] = [];
    collectionSize: number;

    constructor(private _teacherWorkPlaceService: TeacherWorkPlaceService) {
    }

    ngOnInit(): void {
        this.getInfo(0, 2);
    }


    /***
     * #1 List of teacher by university
     * */
    getInfo(page: number, pageSize: number): void {

        const params = 'page=' + page + '&size=' + pageSize;

        // this._teacherWorkPlaceService.findAllByUniversityId(params, this.universityId).subscribe(res => {
        this._teacherWorkPlaceService.findAllTeacherByUniversityId(params, this.universityId).subscribe(res => {

            this.teacherInformationList = res.list;
            this.collectionSize = res.totalSize;

            this.teacherInformationList.forEach(loop => {
                const index = this.teacherInformationList.indexOf(loop);

                if (loop.grade == null) {
                    this.teacherInformationList[index].gradeName = 'F';
                    this.teacherInformationList[index].grade = 0;
                } else {
                    this.teacherInformationList[index].gradeName = this.getGradeName(loop.grade);
                }
            });
        });
    }

    /***
     * #1 Grade Name
     * %points: grade points(number) - get grade name of points
     * */
    getGradeName(points: number): string {

        if (points >= 95 && points <= 100) {
            return 'A';
        } else if (points >= 90 && points < 95) {
            return 'A-';
        } else if (points >= 85 && points < 90) {
            return 'B+';
        } else if (points >= 80 && points < 85) {
            return 'B';
        } else if (points >= 75 && points < 80) {
            return 'B-';
        } else if (points >= 70 && points < 75) {
            return 'C+';
        } else if (points >= 65 && points < 70) {
            return 'C';
        } else if (points >= 60 && points < 65) {
            return 'C-';
        } else if (points >= 55 && points < 60) {
            return 'D+';
        } else if (points >= 51 && points < 55) {
            return 'D';
        } else if (points >= 49 && points < 51) {
            return 'D-';
        } else if (points < 49) {
            return 'F';
        }
    }

}
