import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommentService} from '../../../../../core/service/comment-service';
import {UserInformationService} from '../../../../../core/service/user-information-service';
import {UniversityInformationService} from '../../../../../core/service/university-information-service';
import {UniversityService} from '../../../../../core/service/university-service';
import {CommentPublication} from '../../../../../core/models/comment-publication';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {CommentReplyPublication} from "../../../../../core/models/comment-reply-publication";
import {TeacherInformationService} from "../../../../../core/service/teacher-information-service";

@Component({
    selector: 'app-comment-view',
    templateUrl: './comment-view.component.html',
    styleUrls: ['./comment-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CommentViewComponent implements OnInit {
    // @ Route param - main information
    @Input() commentObject: CommentPublication;
    localUserId: number = parseInt(localStorage.getItem('userId'));

    // @ Comment Reply
    replyCommentWriteClick: boolean;
    commentReplyList: CommentReplyPublication[] = [];
    commentReplyObject: CommentReplyPublication = new CommentReplyPublication();
    commentReplyLength: number;
    showReplyCommentClick: boolean;

    constructor(private _commentService: CommentService,
                private _userInformationService: UserInformationService,
                private _universityInformationService: UniversityInformationService,
                private _universityService: UniversityService,
                private _teacherInformationService: TeacherInformationService) {
    }

    ngOnInit(): void {
        this.findUserName();
        this.getReplyComment();
    }


    // #1 Find User Name and find type of user
    findUserName(): void {

        // ? Comment owner (For delete and edit)
        if (this.commentObject.userId.toString() === localStorage.getItem('userId')) {
            this.commentObject.commentOwner = true;
        }

        // @ User group - user
        this._userInformationService.findByUserIdFromList(this.commentObject.userId).subscribe(res => {
            if (res.length === 0) {
            } else {
                this._userInformationService.findByUserId(this.commentObject.userId).subscribe(resUser => {
                    this.commentObject.userName = resUser.lastName + ' ' + resUser.firstName;
                });
            }
        });

        // @ User group - teacher
        this._teacherInformationService.findByUserIdFromList(this.commentObject.userId).subscribe(res => {
            if (res.length === 0) {
            } else {
                this._teacherInformationService.findByUserId(this.commentObject.userId).subscribe(resUser => {
                    this.commentObject.userName = resUser.lastName + ' ' + resUser.firstName;
                });
            }
        });

        // @ User group - university
        this._universityInformationService.findByUserIdFromList(this.commentObject.userId).subscribe(res => {
            if (res.length === 0) {
            } else {
                this._universityInformationService.findByUserId(this.commentObject.userId).subscribe(resUniversity => {
                    this._universityService.getUniversityById(resUniversity.universityId).subscribe(resUniversityName => {
                        this.commentObject.userName = resUniversityName.name;
                    });
                });
            }
        });
    }

    // #1 Get all reply comment
    getReplyComment(): void {
        this._commentService.getReplyCommentByComment(this.commentObject.id).subscribe(res => {
            this.commentReplyList = res;
            this.commentReplyLength = res.length;
        });
    }

    // #2 Show Reply comment, if this comment has reply comments
    showReplyComments(): void {
        this.showReplyCommentClick = true;
    }

    // #2 Open textarea for writing reply comment
    replyComment(): void {
        this.replyCommentWriteClick = true;
    }

    // ##2 Create reply comment
    createReplyComment(): void {

        this.commentReplyObject.userId = parseInt(localStorage.getItem('userId'));
        this.commentReplyObject.commentId = this.commentObject.id;
        this.commentReplyObject.replyLinkUserId = this.commentObject.userId;
        this.commentReplyObject.replyLink = this.commentObject.userName;
        this.commentReplyObject.publicationId = this.commentObject.publicationId;
        this.commentReplyObject.commentType = 1;
        this.commentReplyObject.editType = 0;

        this._commentService.saveReplyComment(this.commentReplyObject).subscribe(res => {
            this.commentReplyList.push(res);

            this.showReplyCommentClick = true;
            this.replyCommentWriteClick = false;
            this.commentReplyObject = new CommentReplyPublication();

        });
    }

    // ##3 Create reply comment
    createReplyCommentToReply(commentReplyToReply: CommentReplyPublication): void {

        this._commentService.saveReplyComment(commentReplyToReply).subscribe(res => {
            this.commentReplyList.push(res);
        });
    }

}
