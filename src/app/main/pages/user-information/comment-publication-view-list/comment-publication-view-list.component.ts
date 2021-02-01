import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommentService} from '../../../../core/service/comment-service';
import {CommentPublication} from '../../../../core/models/comment-publication';
import {UserInformationService} from '../../../../core/service/user-information-service';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {UniversityService} from '../../../../core/service/university-service';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-comment-publication-view-list',
    templateUrl: './comment-publication-view-list.component.html',
    styleUrls: ['./comment-publication-view-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CommentPublicationViewListComponent implements OnInit {
    // @ Route param - main information
    @Input() publicationId: number;
    profilePhoto: string;
    // ownerUserName: string;

    // @ Comment information
    commentList: CommentPublication[] = [];
    commentCount: number;
    showCommentClick: boolean;

    // @ Creating comment information
    commentObject: CommentPublication = new CommentPublication();
    // @ Creating reply comment
    replyCommentClick: boolean;


    constructor(private _commentService: CommentService,
                private _userInformationService: UserInformationService,
                private _universityInformationService: UniversityInformationService,
                private _universityService: UniversityService) {
    }

    ngOnInit(): void {

        // ? Show comment, false, not showed yet
        this.showCommentClick = false;

        this.getAllComment();
        this.profilePhoto = '/picture/file/' + localStorage.getItem('userId');
        // this.profilePhoto = 'http://localhost:8700/picture/file/' + localStorage.getItem('userId');
        // this.findOwnerUserName();
    }


    // #1 Find all publication comment
    getAllComment(): void {
        this._commentService.getCommentByPublication(this.publicationId).subscribe(res => {
            this.commentList = res;
            this.findUserName();

            this._commentService.countReplyComment(this.publicationId).subscribe(resCount => {
                this.commentCount = res.length + resCount;
            });
        });
    }

    // #1 Find User Name and find type of user
    findUserName(): void {

        this.commentList.forEach(loop => {
            const index = this.commentList.indexOf(loop);

            // // ? Comment owner
            // if (loop.userId.toString() === localStorage.getItem('userId')) {
            //     this.commentList[index].commentOwner = true;
            // }

            // @ User group - user
            this._userInformationService.findByUserIdFromList(loop.userId).subscribe(res => {
                if (res.length === 0) {
                } else {
                    this._userInformationService.findByUserId(loop.userId).subscribe(resUser => {
                        this.commentList[index].userName = resUser.lastName + ' ' + resUser.firstName;
                    });
                }
            });

            // @ User group - university
            this._universityInformationService.findByUserIdFromList(loop.userId).subscribe(res => {
                if (res.length === 0) {
                } else {
                    this._universityInformationService.findByUserId(loop.userId).subscribe(resUniversity => {
                        this._universityService.getUniversityById(resUniversity.universityId).subscribe(resUniversityName => {
                            this.commentList[index].userName = resUniversityName.name;
                        });
                    });
                }
            });

        });
    }

    /*** TODO: Maybe will be use this */
    // // @ User Name, who was login in web page
    // findOwnerUserName(): void {
    //     // @ User group - user
    //     this._userInformationService.findByUserIdFromList(parseInt(localStorage.getItem('userId'))).subscribe(res => {
    //         if (res.length === 0) {
    //         } else {
    //             this._userInformationService.findByUserId(parseInt(localStorage.getItem('userId'))).subscribe(resUser => {
    //                 this.ownerUserName = resUser.lastName + ' ' + resUser.firstName;
    //             });
    //         }
    //     });
    //
    //     // @ User group - university
    //     this._universityInformationService.findByUserIdFromList(parseInt(localStorage.getItem('userId'))).subscribe(res => {
    //         if (res.length === 0) {
    //         } else {
    //             this._universityInformationService.findByUserId(parseInt(localStorage.getItem('userId'))).subscribe(resUniversity => {
    //                 this._universityService.getUniversityById(resUniversity.universityId).subscribe(resUniversityName => {
    //                     this.ownerUserName = resUniversityName.name;
    //                 });
    //             });
    //         }
    //     });
    // }


    // #2 Show comment
    showComments(): void {
        this.showCommentClick = true;
    }

    // ##2 Create new comment for publication
    createComment(): void {

        this.commentObject.userId = parseInt(localStorage.getItem('userId'));
        this.commentObject.publicationId = this.publicationId;
        this.commentObject.commentType = 0;
        this.commentObject.editType = 0;
        // this.commentObject.userName = this.ownerUserName;

        setTimeout(() => {
            this._commentService.saveComment(this.commentObject).subscribe(res => {
                this.commentList.push(res);
                this.showCommentClick = true;
                this.commentObject = new CommentPublication();
            });
        }, 10);

    }

    // # Method example
    replyComment(): void {
        this.replyCommentClick = true;
    }

}
