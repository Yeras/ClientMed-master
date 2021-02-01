import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {Router} from '@angular/router';
import {FollowingFollowerUserService} from '../../../../core/service/following-follower-user-service';
import {UserInformationService} from '../../../../core/service/user-information-service';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {TeacherInformationService} from '../../../../core/service/teacher-information-service';
import {FollowingFollowerUserInformation} from '../../../../core/models/following-follower-user-information';

@Component({
    selector: 'app-user-followers-list',
    templateUrl: './user-followers-list.component.html',
    styleUrls: ['./user-followers-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserFollowersListComponent implements OnInit, OnChanges {
    // @Input params
    @Input() userId: number;

    // @Follower information
    followerUserInformationList: FollowingFollowerUserInformation[] = [];
    followerSize: number;

    // @ Page new data for scroll
    pageScroll: number;
    pageSizeScroll: number;
    scrollLoaderStat: boolean;

    // @ Searching teacher
    searchType: string;
    searchName: string;

    constructor(private _router: Router,
                private _followingFollowerUserService: FollowingFollowerUserService,
                private _userInformationService: UserInformationService,
                private _universityInformationService: UniversityInformationService,
                private _teacherInformationService: TeacherInformationService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._userInformationService.findByUserIdFromList(this.userId).subscribe(res => {
            if (res.length === 0) {
                this._teacherInformationService.findByUserIdFromList(this.userId).subscribe(resTeacher => {
                    if (resTeacher.length === 0) {
                        this._universityInformationService.findByUserIdFromList(this.userId).subscribe(resUniversity => {
                            if (resUniversity.length === 0) {
                                this._router.navigateByUrl('/404');
                            } else {
                                if (changes.userId.firstChange === false) {
                                    this.ngOnInit();
                                }
                            }
                        });
                    } else {
                        if (changes.userId.firstChange === false) {
                            this.ngOnInit();
                        }
                    }
                });
            } else {
                if (changes.userId.firstChange === false) {
                    this.ngOnInit();
                }
            }
        });
    }

    ngOnInit(): void {
        this.pageScroll = 0;
        this.pageSizeScroll = 20;

        this.getFollower(this.pageScroll, this.pageSizeScroll);
    }


    /***
     * #1 Get information about follower
     *
     * @Page - number of page for viewing
     * @PageSize - sum of objects for viewing(quantity)
     * */
    getFollower(page: number, pageSize: number): void {
        this.searchType = 'all';

        const params = 'page=' + page + '&size=' + pageSize;

        this._followingFollowerUserService.findFollowerUser(params, this.userId).subscribe(res => {
            this.followerUserInformationList = res.list;
            this.followerSize = res.totalSize;
        });
    }

    /***
     * #2 Add new element by scrolling
     * */
    findMoreDataScrolling(): void {
        this.scrollLoaderStat = true;

        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._followingFollowerUserService.findFollowerUser(params, this.userId).subscribe(res => {
            res.list.forEach(loopPush => {
                this.followerUserInformationList.push(loopPush);
            });

            this.scrollLoaderStat = false;
        });
    }

    /**********************************************
     * SEARCH
     * ********************************************/


    /***
     * #1 Search by name
     * */
    searchByName(): void {
        this.pageScroll = 0;
        this.pageSizeScroll = 15;

        if (this.searchName.trim() !== '') {
            this.searchType = 'name';

            const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

            this._followingFollowerUserService.searchFollowerUser(params, this.userId, this.searchName).subscribe(res => {

                this.followerUserInformationList = res.list;
                this.followerSize = res.totalSize;

            });
        } else {
            this.pageScroll = 0;
            this.pageSizeScroll = 20;

            this.getFollower(this.pageScroll, this.pageSizeScroll);
        }
    }

    /***
     * #2 Add new element for scrolling by search
     * */
    searchMoreDataScrolling(): void {
        this.scrollLoaderStat = true;

        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._followingFollowerUserService.searchFollowerUser(params, this.userId, this.searchName).subscribe(res => {
            res.list.forEach(loopPush => {
                this.followerUserInformationList.push(loopPush);
            });
            this.scrollLoaderStat = false;
        });
    }

}
