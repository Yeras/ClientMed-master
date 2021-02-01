import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UniversityInfoModel} from '../../../../core/models/university-info-model';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-adm-university-list',
    templateUrl: './adm-university-list.component.html',
    styleUrls: ['./adm-university-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AdmUniversityListComponent implements OnInit {
    // @ Universities list view information
    universityInfoList: UniversityInfoModel[] = [];
    collectionSize: number;

    // @ Searching university
    searchType: string;
    searchName: string;
    mouseFocusedStat: boolean;

    constructor(private _universityInformation: UniversityInformationService) {
    }

    ngOnInit(): void {
        this.mouseFocusedStat = false;
        this.getInfo(0, 5);
    }


    // #1 Main info list
    getInfo(page: number, pageSize: number): void {

        this.searchType = 'all';
        const params = 'page=' + page + '&size=' + pageSize;

        this._universityInformation.getInformation(params).subscribe(res => {
            this.universityInfoList = res.list;
            this.collectionSize = res.totalSize;
        });
    }

    // #2 Search by university name
    searchByName(page: number, pageSize: number): void {

        if (this.searchName.trim() !== '') {
            this.searchType = 'name';

            const params = 'page=' + page + '&size=' + pageSize;

            this._universityInformation.searchByName(params, this.searchName).subscribe(res => {
                this.universityInfoList = res.list;

                this.collectionSize = res.totalSize;
            });

        } else {
            this.getInfo(page, pageSize);
        }
    }

    // #3 Input search icon view
    mouseFocused(): void {
        this.mouseFocusedStat = true;
    }

    // #3 Input search icon view
    mouseNotFocused(): void {
        setTimeout(() => {
            this.mouseFocusedStat = false;
        }, 100);
    }

    // #4 Call this method from sub component
    refreshFromChanging(): void {
        this.ngOnInit();
    }

}
