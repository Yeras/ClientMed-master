import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentReplyPublication} from '../../../../../../core/models/comment-reply-publication';
import {CommentService} from '../../../../../../core/service/comment-service';
import {UserInformationService} from '../../../../../../core/service/user-information-service';
import {UniversityInformationService} from '../../../../../../core/service/university-information-service';
import {UniversityService} from '../../../../../../core/service/university-service';

@Component({
    selector: 'app-comment-publication-reply',
    templateUrl: './comment-publication-reply.component.html',
    styleUrls: ['./comment-publication-reply.component.scss']
})
export class CommentPublicationReplyComponent implements OnInit {
    // @ Route param - main information
    @Input() commentReplyObject: CommentReplyPublication;
    @Output() commentReplyObjectEvent = new EventEmitter<CommentReplyPublication>();

    localStorageUserId: number = parseInt(localStorage.getItem('userId'));

    // @ Reply comment to reply comment
    commentReplyObjectReply: CommentReplyPublication = new CommentReplyPublication();
    replyCommentWriteClick: boolean;


    constructor(private _commentService: CommentService,
                private _userInformationService: UserInformationService,
                private _universityInformationService: UniversityInformationService,
                private _universityService: UniversityService) {
    }

    ngOnInit(): void {
        this.findUserName();
    }


    // #1 Find User Name and find type of user
    findUserName(): void {

        // ? Comment owner (For delete and edit)
        if (this.commentReplyObject.userId.toString() === localStorage.getItem('userId')) {
            this.commentReplyObject.commentOwner = true;
        }

        // @ User group - user
        this._userInformationService.findByUserIdFromList(this.commentReplyObject.userId).subscribe(res => {
            if (res.length === 0) {
            } else {
                this._userInformationService.findByUserId(this.commentReplyObject.userId).subscribe(resUser => {
                    this.commentReplyObject.userName = resUser.lastName + ' ' + resUser.firstName;
                });
            }
        });

        // @ User group - university
        this._universityInformationService.findByUserIdFromList(this.commentReplyObject.userId).subscribe(res => {
            if (res.length === 0) {
            } else {
                this._universityInformationService.findByUserId(this.commentReplyObject.userId).subscribe(resUniversity => {
                    this._universityService.getUniversityById(resUniversity.universityId).subscribe(resUniversityName => {
                        this.commentReplyObject.userName = resUniversityName.name;
                    });
                });
            }
        });
    }

    // #2 Open textarea for writing reply comment to reply comment
    replyCommentToReply(): void {
        this.replyCommentWriteClick = true;
    }

    // ##2 Write reply comment to reply comment
    createReplyToReply(): void {

        this.commentReplyObjectReply.publicationId = this.commentReplyObject.publicationId;
        this.commentReplyObjectReply.userId = parseInt(localStorage.getItem('userId'));
        this.commentReplyObjectReply.commentId = this.commentReplyObject.commentId;
        this.commentReplyObjectReply.replyLink = this.commentReplyObject.userName;
        this.commentReplyObjectReply.replyLinkUserId = this.commentReplyObject.userId;
        this.commentReplyObjectReply.editType = 0;
        this.commentReplyObjectReply.commentType = 1;

        setTimeout(() => {
            this.commentReplyObjectEvent.emit(this.commentReplyObjectReply);
            this.commentReplyObjectReply = new CommentReplyPublication();
            this.replyCommentWriteClick = false;
        }, 20);
    }

}
