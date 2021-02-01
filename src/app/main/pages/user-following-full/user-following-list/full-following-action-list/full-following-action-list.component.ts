import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {MatDialog} from '@angular/material/dialog';
import {CountryService} from '../../../../../core/service/country-service';
import {FollowingRequestService} from '../../../../../core/service/following-request-service';
import {FollowingService} from '../../../../../core/service/following-service';
import {TeacherWorkPlaceService} from '../../../../../core/service/teacher-work-place-service';
import {UniversityInformationService} from '../../../../../core/service/university-information-service';
import {UnfollowRemoveUserModalComponent} from '../../../user-information/unfollow-remove-user-modal/unfollow-remove-user-modal.component';
import {WriteMessageComponent} from '../../../user-information/write-message/write-message.component';

@Component({
    selector: 'app-full-following-action-list',
    templateUrl: './full-following-action-list.component.html',
    styleUrls: ['./full-following-action-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FullFollowingActionListComponent implements OnInit {
    // @Input params
    @Input() userId: number;
    @Input() followingUserId: number;
    @Output() unFollowUser = new EventEmitter<number>();

    // @ Following stat
    myProfileStat: boolean;
    universityUser: boolean;

    constructor(private _modalService: MatDialog,
                private _countryService: CountryService,
                private _followingRequestService: FollowingRequestService,
                private _followingService: FollowingService,
                private _teacherWorkPlaceService: TeacherWorkPlaceService,
                private _universityInformationService: UniversityInformationService) {
    }

    ngOnInit(): void {

        if (this.userId.toString() !== localStorage.getItem('userId')) {
            this.myProfileStat = false;
        } else {
            this.myProfileStat = true;
        }

        this._universityInformationService.findByUserIdFromList(this.followingUserId).subscribe(resUniversity => {
            if (resUniversity.length === 0) {
                this.universityUser = false;
            } else {
                this.universityUser = true;
            }
        });
    }


    /***
     * #1 Send Message to teacher
     * */
    sendMessage(): void {
        this._modalService.open(WriteMessageComponent, {
            data: {toUserId: this.followingUserId},
            width: '55vh',
            height: '40vh'
        }).updatePosition({top: '10%'});
    }

    /***
     * #1 UnFollow to teacher (remove following)
     * */
    unFollowToUser(): void {
        this._modalService.open(UnfollowRemoveUserModalComponent, {
            data: {removeType: 'removeFollow'},
            width: '55vh',
            // height: '20vh'
        }).updatePosition({top: '10%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this._followingService.deleteFollowing(parseInt(localStorage.getItem('userId')), this.followingUserId).subscribe(resDelete => {
                    this.unFollowUser.emit(this.followingUserId);
                });
            }
        });
    }

}
