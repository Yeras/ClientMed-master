import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FollowingFollowerUserInformation} from '../../../../core/models/following-follower-user-information';
import {Router} from '@angular/router';
import {FollowingFollowerUserService} from '../../../../core/service/following-follower-user-service';
import {UserInformationService} from '../../../../core/service/user-information-service';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {TeacherInformationService} from '../../../../core/service/teacher-information-service';

@Component({
    selector: 'app-follower-list',
    templateUrl: './follower-list.component.html',
    styleUrls: ['./follower-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FollowerListComponent implements OnInit, OnChanges {
    // @ Router params
    @Input() userId: number;

    // @ Following and Follower information
    followerUserInformationList: FollowingFollowerUserInformation[] = [];
    followerSize: number;

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
                            if (changes.userId.firstChange === false) {
                                this.ngOnInit();
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
        this.getFollower(0, 2);
    }


    /***
     * #1 Get information about follower
     *
     * @Page - number of page for viewing
     * @PageSize - sum of objects for viewing(quantity)
     * */
    getFollower(page: number, pageSize: number): void {

        const params = 'page=' + page + '&size=' + pageSize;

        this._followingFollowerUserService.findFollowerUser(params, this.userId).subscribe(res => {

            this.followerUserInformationList = res.list;
            this.followerSize = res.totalSize;
        });
    }

}
