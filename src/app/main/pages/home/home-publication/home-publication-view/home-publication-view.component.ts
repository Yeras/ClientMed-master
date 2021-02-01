import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {NewsPublication} from '../../../../../core/models/news-publication';
import {NewsPublicationService} from '../../../../../core/service/news-publication-service';
import {UserInformationService} from '../../../../../core/service/user-information-service';
import {UniversityInformationService} from '../../../../../core/service/university-information-service';
import {UniversityService} from '../../../../../core/service/university-service';
import {CommentService} from '../../../../../core/service/comment-service';
import {MatDialog} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-home-publication-view',
    templateUrl: './home-publication-view.component.html',
    styleUrls: ['./home-publication-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class HomePublicationViewComponent implements OnInit, OnChanges {
    // @ http route parameter
    @Input() userId: number;
    @Input() changeEngine: string;

    // @ Profile picture
    profilePhoto: string;

    // @ Information about user publication
    publicationList: NewsPublication[] = [];
    publicationLength: number;

    // @ Page new data for scroll
    pageScroll: number;
    pageSizeScroll: number;
    scrollLoaderStat: boolean;

    constructor(private _newsPublicationService: NewsPublicationService,
                private _userInformationService: UserInformationService,
                private _universityInformationService: UniversityInformationService,
                private _universityService: UniversityService,
                private _commentService: CommentService,
                private _modalService: MatDialog) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // ? Try to find changing in engine
        try {
            if (!changes.changeEngine.firstChange) {
                this.ngOnInit();
            }
        } catch (e) {
        }

        // ? Try to find changing in userId
        try {
            if (!changes.userId.firstChange) {
                this.ngOnInit();
            }
        } catch (e) {
        }
    }

    ngOnInit(): void {
        this.pageScroll = 0;
        this.pageSizeScroll = 5;

        // this.profilePhoto = 'http://localhost:8700/picture/file/' + this.userId;
        this.profilePhoto = '/picture/file/' + this.userId;

        this.getAllPublicationByUserId(this.pageScroll, this.pageSizeScroll);
    }


    /***
     * #1 Get all user publication
     * */
    getAllPublicationByUserId(page: number, pageSize: number): void {
        const params = 'page=' + page + '&size=' + pageSize;

        this._newsPublicationService.homeAllByUserId(params, this.userId).subscribe(res => {
            this.publicationLength = res.list.length;
            this.publicationList = res.list;
        });
    }

    /***
     * #2 Add new element by scrolling
     * */
    findMoreDataScrolling(): void {
        this.scrollLoaderStat = true;

        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._newsPublicationService.homeAllByUserId(params, this.userId).subscribe(res => {
            res.list.forEach(loopPush => {
                this.publicationList.push(loopPush);
            });
            this.scrollLoaderStat = false;
        });
    }

    /***
     * #2 Remove publication element from array[]
     * */
    deletePublicationInList(publicationId: number): void {
        let iter = 0;
        this.publicationList.forEach(loopDelete => {
            if (loopDelete.id === publicationId) {
                this.publicationList.splice(iter, 1);
            }
            iter++;
        });
    }

}
