import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {NewsPublicationService} from '../../../../core/service/news-publication-service';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {UserInformationService} from '../../../../core/service/user-information-service';
import {UniversityService} from '../../../../core/service/university-service';
import {NewsPublication} from '../../../../core/models/news-publication';
import {MatDialog} from '@angular/material/dialog';
import {CommentService} from '../../../../core/service/comment-service';

@Component({
    selector: 'app-university-publication-view-list',
    templateUrl: './university-publication-view-list.component.html',
    styleUrls: ['./university-publication-view-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UniversityPublicationViewListComponent implements OnInit, OnChanges {
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

        this.profilePhoto = '/picture/file/' + this.userId;
        // this.profilePhoto = 'http://localhost:8700/picture/file/' + this.userId;

        this.getAllPublicationByUserId(this.pageScroll, this.pageSizeScroll);
    }


    /***
     * #1 Get all user publication
     * */
    getAllPublicationByUserId(page: number, pageSize: number): void {
        const params = 'page=' + page + '&size=' + pageSize;

        this._newsPublicationService.findAllByUserId(params, this.userId).subscribe(res => {
            this.publicationLength = res.list.length;
            this.publicationList = res.list;
        });
    }

    /***
     * #2 Add new element by scrolling
     * */
    findMoreDataScrolling(): void {
        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._newsPublicationService.findAllByUserId(params, this.userId).subscribe(res => {
            res.list.forEach(loopPush => {
                this.publicationList.push(loopPush);
            });
        });
    }

    /***
     * #3 Remove publication element from array[]
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
