import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FollowingFollowerUserInformation} from '../../../../core/models/following-follower-user-information';
import {Router} from '@angular/router';
import {FollowingFollowerUserService} from '../../../../core/service/following-follower-user-service';
import {UserInformationService} from '../../../../core/service/user-information-service';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {TeacherInformationService} from '../../../../core/service/teacher-information-service';

@Component({
    selector: 'app-user-following-list',
    templateUrl: './user-following-list.component.html',
    styleUrls: ['./user-following-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserFollowingListComponent implements OnInit, OnChanges {
    // @Input params
    @Input() userId: number;

    // @Following information
    followingUserInformationList: FollowingFollowerUserInformation[] = [];
    followingSize: number;

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

        this.getFollowing(this.pageScroll, this.pageSizeScroll);
    }


    /***
     * #1 Get information about following
     *
     * @Page - number of page for viewing
     * @PageSize - sum of objects for viewing(quantity)
     * */
    getFollowing(page: number, pageSize: number): void {
        this.searchType = 'all';

        const params = 'page=' + page + '&size=' + pageSize;

        this._followingFollowerUserService.findFollowingUser(params, this.userId).subscribe(res => {

            this.followingUserInformationList = res.list;
            this.followingSize = res.totalSize;
        });
    }

    /***
     * #2 Add new element by scrolling
     * */
    findMoreDataScrolling(): void {
        this.scrollLoaderStat = true;

        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._followingFollowerUserService.findFollowingUser(params, this.userId).subscribe(res => {
            res.list.forEach(loopPush => {
                this.followingUserInformationList.push(loopPush);
            });

            this.scrollLoaderStat = false;
        });
    }

    /***
     * #3 Remove User From list, this action on, when child component call removing
     *
     * @followingUserId - User which we removed from list
     * */
    removeUserFromList(followingUserId: number): void {
        let iter = 0;
        this.followingUserInformationList.forEach(loopDelete => {
            if (loopDelete.followedId === followingUserId) {
                this.followingUserInformationList.splice(iter, 1);
            }
            iter++;
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

            this._followingFollowerUserService.searchFollowingUser(params, this.userId, this.searchName).subscribe(res => {
                this.followingUserInformationList = res.list;
                this.followingSize = res.totalSize;

            });
        } else {
            this.pageScroll = 0;
            this.pageSizeScroll = 20;

            this.getFollowing(this.pageScroll, this.pageSizeScroll);
        }
    }

    /***
     * #2 Add new element for scrolling by search
     * */
    searchMoreDataScrolling(): void {
        this.scrollLoaderStat = true;

        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._followingFollowerUserService.searchFollowingUser(params, this.userId, this.searchName).subscribe(res => {
            res.list.forEach(loopPush => {
                this.followingUserInformationList.push(loopPush);
            });

            this.scrollLoaderStat = false;

        });
    }

}
