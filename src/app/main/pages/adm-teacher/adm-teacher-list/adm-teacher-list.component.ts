import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UniversityInfoModel} from '../../../../core/models/university-info-model';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {TeacherWorkPlaceService} from '../../../../core/service/teacher-work-place-service';
import {TeacherInfo} from '../../../../core/models/teacher-info';

@Component({
    selector: 'app-adm-teacher-list',
    templateUrl: './adm-teacher-list.component.html',
    styleUrls: ['./adm-teacher-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AdmTeacherListComponent implements OnInit {
    // @ University Access
    @Input() universityAccountStat: boolean;

    // @ Teacher information view list
    teacherInformationList: TeacherInfo[] = [];

    // @ Universities list view information
    universityInfoList: UniversityInfoModel[] = [];
    collectionSize: number;

    // @ Searching teacher
    searchType: string;
    searchName: string;
    mouseFocusedStat: boolean;

    constructor(private _universityInformation: UniversityInformationService,
                private _teacherWorkPlaceService: TeacherWorkPlaceService) {
    }

    ngOnInit(): void {
        this.mouseFocusedStat = false;
        this.getInfo(0, 5);
    }


    /***
     * #1 Main info list
     * */
    getInfo(page: number, pageSize: number): void {

        this.searchType = 'all';
        const params = 'page=' + page + '&size=' + pageSize;

        this._teacherWorkPlaceService.findAllByUniversityId(params, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            this.teacherInformationList = res.list;
            this.collectionSize = res.totalSize;
        });
    }

    /***
     * #2 Search by teacher name
     * */
    searchByName(page: number, pageSize: number): void {

        if (this.searchName.trim() !== '') {
            this.searchType = 'name';

            const params = 'page=' + page + '&size=' + pageSize;

            this._teacherWorkPlaceService.searchTeacher(params, parseInt(localStorage.getItem('userId')), this.searchName).subscribe(res => {
                this.teacherInformationList = res.list;
                this.collectionSize = res.totalSize;
            });
        } else {
            this.getInfo(page, pageSize);
        }
    }

    /***
     * #3 Input search icon view
     * */
    mouseFocused(): void {
        this.mouseFocusedStat = true;
    }

    /***
     * #3 Input search icon view
     * */
    mouseNotFocused(): void {
        setTimeout(() => {
            this.mouseFocusedStat = false;
        }, 100);
    }

    /***
     * #4 Call this method from sub component
     * */
    refreshFromChanging(): void {
        this.ngOnInit();
    }

}
