import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {AchievementInformationService} from '../../../core/service/achievement-information-service';
import {AchievementInfo} from '../../../core/models/achievement-info';

@Component({
    selector: 'app-adm-achievement',
    templateUrl: './adm-achievement.component.html',
    styleUrls: ['./adm-achievement.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AdmAchievementComponent implements OnInit {
    // @ Information about achievement
    achievementInfo: AchievementInfo[] = [];
    collectionSize: number;
    yerasAccess: string;
    yerasGiveAccess: string;

    // @ Searching university
    searchType: string;
    searchName: string;
    mouseFocusedStat: boolean;


    constructor(private _achievementInfoService: AchievementInformationService) {
    }

    ngOnInit(): void {
        // Yeras Account
        this.yerasGiveAccess = 'yeraskz@gmail.com';
        this.yerasAccess = localStorage.getItem('emailId');
        this.findAllAchievement(0, 5);
    }


    /***
     * #1 All achievement
     * */
    findAllAchievement(page: number, pageSize: number): void {
        const params = 'page=' + page + '&size=' + pageSize;

        this._achievementInfoService.findAllAchievement(params).subscribe(res => {
            this.achievementInfo = res.list;
            this.collectionSize = res.totalSize;
        });
    }

    /***
     * #2 Search by university name
     * */
    searchByName(page: number, pageSize: number): void {

        // if (this.searchName.trim() !== '') {
        //     this.searchType = 'name';
        //
        //     const params = 'page=' + page + '&size=' + pageSize;
        //
        //     this._teacherWorkPlaceService.searchTeacher(params, parseInt(localStorage.getItem('userId')), this.searchName).subscribe(res => {
        //         this.teacherInformationList = res.list;
        //         this.collectionSize = res.totalSize;
        //     });
        //
        // } else {
        //     this.getInfo(page, pageSize);
        // }
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
