import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {MatDialog} from '@angular/material/dialog';
import {UserThinkWriteAboutComponent} from './user-think-write-about/user-think-write-about.component';
import {TeacherInformationService} from '../../../core/service/teacher-information-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FollowingService} from '../../../core/service/following-service';
import {TeacherAboutThinkService} from '../../../core/service/teacher-about-think-service';
import {TeacherAboutThinkToFront} from '../../../core/models/teacher-about-think-to-front';

@Component({
    selector: 'app-user-think-about-teacher',
    templateUrl: './user-think-about-teacher.component.html',
    styleUrls: ['./user-think-about-teacher.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserThinkAboutTeacherComponent implements OnInit {
    // @ Router params
    userId: number;

    // @ Teacher Information
    myProfileStat: boolean;

    // @ Profile picture
    profilePhoto: string;

    // @ Following stat
    followingStat: boolean;

    // @ Think about object
    teacherAboutThinkToFront: TeacherAboutThinkToFront[] = [];

    // @ Page new data for scroll
    pageScroll: number;
    pageSizeScroll: number;

    constructor(private _route: ActivatedRoute,
                private _modalService: MatDialog,
                private _teacherInformationService: TeacherInformationService,
                private _router: Router,
                private _followingService: FollowingService,
                private _teacherAboutThinkService: TeacherAboutThinkService) {
        this._route.params.subscribe(params => {
                this._teacherInformationService.findByUserIdFromList(params.teacherId).subscribe(resTeacher => {
                    if (resTeacher.length === 0) {
                        this._router.navigateByUrl('/404');
                    } else {
                        this.userId = params.teacherId;

                        // @ Page new data for scroll
                        this.pageScroll = 0;
                        this.pageSizeScroll = 20;

                        if (this.userId.toString() === localStorage.getItem('userId')) {
                            this.myProfileStat = true;
                        } else {
                            this.myProfileStat = false;
                        }

                        this.getFollowingStatInfo();
                        this.findAllInfo();

                        this.profilePhoto = '/picture/file/' + localStorage.getItem('userId');
                        // this.profilePhoto = 'http://localhost:8700/picture/file/' + localStorage.getItem('userId');
                    }
                });
            }
        );
    }


    ngOnInit(): void {
    }


    /***
     * #1 Get Information, about following, if function return data, it means, main user to following
     * */
    getFollowingStatInfo(): void {
        this._followingService.findFollower(parseInt(localStorage.getItem('userId')), this.userId).subscribe(res => {
            if (res) {
                this.followingStat = true;
            }
        });
    }

    /***
     * #1 Get All about think
     * */
    findAllInfo(): void {
        const params = 'page=' + 0 + '&size=' + 20;

        this._teacherAboutThinkService.findAllAbout(params, this.userId).subscribe(res => {
            this.teacherAboutThinkToFront = res.list;
        });
    }

    /***
     * #2 Add new element by scrolling
     * */
    searchMoreDataScrollingAboutThink(): void {
        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._teacherAboutThinkService.findAllAbout(params, this.userId).subscribe(res => {
            res.list.forEach(loopPush => {
                this.teacherAboutThinkToFront.push(loopPush);
            });
        });
    }

    /***
     * ##2 Create new about
     * */
    createWhatYouThink(): void {
        this._modalService.open(UserThinkWriteAboutComponent, {
            data: {
                userId: this.userId
            },
            maxWidth: '65vh !important',
            maxHeight: '80vh',
            width: '55vh',
            height: '50vh'
        }).updatePosition({top: '5%'})
            .afterClosed().subscribe(res => {
            if (res) {
                let teacherAboutThinkToFrontNew;
                teacherAboutThinkToFrontNew = this.teacherAboutThinkToFront;

                setTimeout(() => {
                    this._teacherAboutThinkService.findById(parseInt(res)).subscribe(resNew => {
                        this.teacherAboutThinkToFront = [];
                        this.teacherAboutThinkToFront.push(resNew);

                        teacherAboutThinkToFrontNew.forEach(loopPush => {
                            this.teacherAboutThinkToFront.push(loopPush);
                        });
                    });
                }, 100);
            }
        });
    }

}
