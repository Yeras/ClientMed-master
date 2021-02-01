import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {Router} from '@angular/router';
import {TeacherWorkPlaceService} from '../../../../core/service/teacher-work-place-service';
import {TeacherInfo} from '../../../../core/models/teacher-info';

@Component({
    selector: 'app-university-teachers-list',
    templateUrl: './university-teachers-list.component.html',
    styleUrls: ['./university-teachers-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UniversityTeachersListComponent implements OnInit, OnChanges {
    // Input params from main component
    @Input() universityId: number;

    // @ Teacher information view list
    teacherInformationList: TeacherInfo[] = [];
    collectionSize: number;

    // @ Page new data for scroll
    pageScroll: number;
    pageSizeScroll: number;

    // @ Searching teacher
    searchType: string;
    searchName: string;

    constructor(private _universityInformationService: UniversityInformationService,
                private _router: Router,
                private _teacherWorkPlaceService: TeacherWorkPlaceService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._universityInformationService.findByUserIdFromList(this.universityId).subscribe(res => {
            if (res.length === 0) {
                this._router.navigateByUrl('/404');
            } else {
                // ? Try to find changing in universityId
                try {
                    if (!changes.universityId.firstChange) {
                        this.ngOnInit();
                    }
                } catch (e) {
                }
            }
        });
    }

    ngOnInit(): void {
        this.pageScroll = 0;
        this.pageSizeScroll = 20;

        this.findUniversityTeachers(this.pageScroll, this.pageSizeScroll);
    }


    /***
     * #1 Get All Teachers from concrete university by universityId
     * */
    findUniversityTeachers(page: number, pageSize: number): void {
        this.searchType = 'all';

        const params = 'page=' + page + '&size=' + pageSize;

        this._teacherWorkPlaceService.findAllTeacherByUniversityId(params, this.universityId).subscribe(res => {

            this.teacherInformationList = res.list;
            this.collectionSize = res.list.length;

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
     * @points: grade points(number) - get grade name of points
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

    /***
     * #2 Add new element by scrolling
     * */
    findMoreDataScrolling(): void {

        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._teacherWorkPlaceService.findAllTeacherByUniversityId(params, this.universityId).subscribe(res => {

            res.list.forEach(loopPush => {
                this.teacherInformationList.push(loopPush);
            });

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
     * ##3 Remove Teacher from list (Only for university account)
     * */
    removeTeacher(emit: any): void {
        let iter = 0;
        this.teacherInformationList.forEach(loopDelete => {
            if (loopDelete.userId === emit) {
                this.teacherInformationList.splice(iter, 1);
            }
            iter++;
        });
    }

    /******************************************************
     * Search
     * ****************************************************/

    /***
     * #1 Search by teacher name
     * */
    searchByName(): void {
        this.pageScroll = 0;
        this.pageSizeScroll = 20;

        if (this.searchName.trim() !== '') {
            this.searchType = 'name';

            const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

            this._teacherWorkPlaceService.searchTeacherByName(params, this.universityId, this.searchName).subscribe(res => {
                this.teacherInformationList = res.list;
                this.collectionSize = res.list.length;

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
        } else {
            this.pageScroll = 0;
            this.pageSizeScroll = 20;

            this.findUniversityTeachers(this.pageScroll, this.pageSizeScroll);
        }
    }

    /***
     * #2 Add new element by scrolling for search
     * */
    searchMoreDataScrolling(): void {
        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._teacherWorkPlaceService.searchTeacherByName(params, this.universityId, this.searchName).subscribe(res => {

            res.list.forEach(loopPush => {
                this.teacherInformationList.push(loopPush);
            });

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

}
