import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CountryService} from '../../../../../core/service/country-service';
import {FollowingRequestService} from '../../../../../core/service/following-request-service';
import {FollowingService} from '../../../../../core/service/following-service';
import {TeacherWorkPlaceService} from '../../../../../core/service/teacher-work-place-service';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {UnfollowRemoveUserModalComponent} from '../../../user-information/unfollow-remove-user-modal/unfollow-remove-user-modal.component';
import {WriteMessageComponent} from '../../../user-information/write-message/write-message.component';
import {FollowingRequestUser} from '../../../../../core/models/following-request-user';
import {UniversityInformationService} from '../../../../../core/service/university-information-service';
import {FollowingUser} from '../../../../../core/models/following-user';

@Component({
    selector: 'app-full-followers-action-list',
    templateUrl: './full-followers-action-list.component.html',
    styleUrls: ['./full-followers-action-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FullFollowersActionListComponent implements OnInit {
    // @Input params
    @Input() userId: number;
    @Input() followerUserId: number;

    // @ Following stat
    myProfileStat: boolean;
    followingRequestStat: boolean;
    followingStat: boolean;
    universityUser: boolean;

    // @ Following objects
    followingRequestUser: FollowingRequestUser = new FollowingRequestUser();
    followingUser: FollowingUser = new FollowingUser();

    constructor(private _modalService: MatDialog,
                private _countryService: CountryService,
                private _followingRequestService: FollowingRequestService,
                private _followingService: FollowingService,
                private _teacherWorkPlaceService: TeacherWorkPlaceService,
                private _universityInformationService: UniversityInformationService) {
    }

    ngOnInit(): void {

        this._universityInformationService.findByUserIdFromList(this.followerUserId).subscribe(resUniversity => {
            if (resUniversity.length === 0) {
                this.universityUser = false;
            } else {
                this.universityUser = true;
            }
        });

        if (this.followerUserId !== parseInt(localStorage.getItem('userId'))) {
            this.myProfileStat = false;
        } else {
            this.myProfileStat = true;
        }
        this.getFollowingRequestInfo();
        this.getFollowingStatInfo();
    }


    /***
     * #1 Get Information, about requesting to follow
     * */
    getFollowingRequestInfo(): void {
        this._followingRequestService.findRequestInfo(parseInt(localStorage.getItem('userId')), this.followerUserId).subscribe(res => {
            if (res) {
                this.followingRequestStat = true;
            }
        });
    }

    /***
     * #1 Get Information, about following, if function return data, it means, main user to following
     * */
    getFollowingStatInfo(): void {
        this._followingService.findFollower(parseInt(localStorage.getItem('userId')), this.followerUserId).subscribe(res => {
            if (res) {
                this.followingStat = true;
            }
        });
    }

    /***
     * #2 Request to Follow to this user
     * */
    following(): void {
        this.followingRequestUser.fromUserId = parseInt(localStorage.getItem('userId'));
        this.followingRequestUser.toUserId = this.followerUserId;

        this._followingRequestService.saveFollowingRequest(this.followingRequestUser).subscribe(res => {
            this.followingRequestStat = true;
        });
    }

    /***
     * #2 Follow to this university(without request)
     * */
    followToUniversity(): void {
        this.followingUser.userId = parseInt(localStorage.getItem('userId'));
        this.followingUser.followedId = this.followerUserId;

        this._followingService.saveFollower(this.followingUser).subscribe(res => {
            this.followingStat = true;
        });
    }

    /***
     * #3 Remove request to follow (cancel request to follow)
     * */
    removeRequestFollow(): void {
        this._modalService.open(UnfollowRemoveUserModalComponent, {
            data: {removeType: 'removeRequest'},
            width: '55vh',
            // height: '25vh'
        }).updatePosition({top: '10%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this._followingRequestService.deleteRequestToFollow(parseInt(localStorage.getItem('userId')), this.followerUserId).subscribe(resDelete => {
                    this.followingRequestStat = false;
                });
            }
        });
    }

    /***
     * #4 Send Message to teacher
     * */
    sendMessage(): void {
        this._modalService.open(WriteMessageComponent, {
            data: {toUserId: this.followerUserId},
            width: '55vh',
            height: '40vh'
        }).updatePosition({top: '10%'});
    }

    /***
     * #6 UnFollow to teacher (remove following)
     * */
    unFollowToUser(): void {
        this._modalService.open(UnfollowRemoveUserModalComponent, {
            data: {removeType: 'removeFollow'},
            width: '55vh',
            // height: '20vh'
        }).updatePosition({top: '10%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this._followingService.deleteFollowing(parseInt(localStorage.getItem('userId')), this.followerUserId).subscribe(resDelete => {
                    this.followingStat = false;
                });
            }
        });
    }

}
