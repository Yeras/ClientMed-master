import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {UnfollowRemoveUserModalComponent} from '../../../user-information/unfollow-remove-user-modal/unfollow-remove-user-modal.component';
import {WriteMessageComponent} from '../../../user-information/write-message/write-message.component';
import {MatDialog} from '@angular/material/dialog';
import {CountryService} from '../../../../../core/service/country-service';
import {FollowingRequestService} from '../../../../../core/service/following-request-service';
import {FollowingService} from '../../../../../core/service/following-service';
import {FollowingRequestUser} from '../../../../../core/models/following-request-user';
import {TeacherWorkPlaceService} from '../../../../../core/service/teacher-work-place-service';
import {TeacherWorkInfo} from '../../../../../core/models/teacher-work-info';
import {ActionRemoveTeacherComponent} from './action-remove-teacher/action-remove-teacher.component';

@Component({
    selector: 'app-action-list',
    templateUrl: './action-list.component.html',
    styleUrls: ['./action-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ActionListComponent implements OnInit {
    // @ Input params
    @Input() teacherId: number;
    @Input() universityId: number;

    // @ Only for university account
    universityAccountStat: boolean; // ? University Stat check with input param(universityId)
    @Output() removeTeacherFromList = new EventEmitter<number>();

    // @ Following stat
    myProfileStat: boolean;
    followingRequestStat: boolean;
    followingStat: boolean;

    // @ Following objects
    followingRequestUser: FollowingRequestUser = new FollowingRequestUser();

    // @ Teacher Work information (if @universityAccountStat === true)
    teacherWorkPlace: TeacherWorkInfo = new TeacherWorkInfo();

    constructor(private _modalService: MatDialog,
                private _countryService: CountryService,
                private _followingRequestService: FollowingRequestService,
                private _followingService: FollowingService,
                private _teacherWorkPlaceService: TeacherWorkPlaceService) {
    }

    ngOnInit(): void {

        if (this.universityId.toString() !== localStorage.getItem('userId')) {
            this.followingRequestStat = false;
            this.followingStat = false;
            this.universityAccountStat = false;

            if (this.teacherId.toString() !== localStorage.getItem('userId')) {
                this.myProfileStat = false;
                this.getFollowingRequestInfo();
                this.getFollowingStatInfo();
            } else {
                this.myProfileStat = true;
            }
        } else {
            this.universityAccountStat = true;
            this.getInfoForRemove();
        }
    }


    /***
     * #1 Get Information, about requesting to follow
     * */
    getFollowingRequestInfo(): void {
        this._followingRequestService.findRequestInfo(parseInt(localStorage.getItem('userId')), this.teacherId).subscribe(res => {
            if (res) {
                this.followingRequestStat = true;
            }
        });
    }

    /***
     * #1 Get Information, about following, if function return data, it means, main user to following
     * */
    getFollowingStatInfo(): void {
        this._followingService.findFollower(parseInt(localStorage.getItem('userId')), this.teacherId).subscribe(res => {
            if (res) {
                this.followingStat = true;
            }
        });
    }

    /***
     * #2 Follow to this teacher
     * */
    following(): void {
        this.followingRequestUser.fromUserId = parseInt(localStorage.getItem('userId'));
        this.followingRequestUser.toUserId = this.teacherId;

        this._followingRequestService.saveFollowingRequest(this.followingRequestUser).subscribe(res => {
            this.followingRequestStat = true;
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
                this._followingRequestService.deleteRequestToFollow(parseInt(localStorage.getItem('userId')), this.teacherId).subscribe(resDelete => {
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
            data: {toUserId: this.teacherId},
            width: '55vh',
            // height: '40vh'
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
                this._followingService.deleteFollowing(parseInt(localStorage.getItem('userId')), this.teacherId).subscribe(resDelete => {
                    this.followingStat = false;
                });
            }
        });
    }

    /*
    * ***************************
    * Only for university account
    * ***************************
    * */
    /***
     * #1 Find Work Place information for removing (Only for university account)
     * */
    getInfoForRemove(): void {
        this._teacherWorkPlaceService.findTeacherByUniversityId(this.universityId, this.teacherId).subscribe(res => {
            this.teacherWorkPlace = res;
        });
    }

    /***
     * ##2 Delete teacher from university list (Only for university account)
     * */
    removeTeacher(): void {
        this._modalService.open(ActionRemoveTeacherComponent, {
            data: {teacherId: this.teacherId},
            width: '55vh',
            // height: '20vh'
        }).updatePosition({top: '10%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this._teacherWorkPlaceService.removeToRemove(this.teacherWorkPlace).subscribe(resDelete => {
                    this.removeTeacherFromList.emit(this.teacherId);
                });
            }
        });
    }

}
