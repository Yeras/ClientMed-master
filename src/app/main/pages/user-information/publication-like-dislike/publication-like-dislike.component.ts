import {Component, Input, OnInit} from '@angular/core';
import {PublicationLikeDislikeService} from '../../../../core/service/publication-like-dislike-service';
import {PublicationLikeDislike} from '../../../../core/models/publication-like-dislike';

@Component({
    selector: 'app-publication-like-dislike',
    templateUrl: './publication-like-dislike.component.html',
    styleUrls: ['./publication-like-dislike.component.scss']
})
export class PublicationLikeDislikeComponent implements OnInit {
    // @ http route parameter
    @Input() publicationId: number;
    userId: number = parseInt(localStorage.getItem('userId'));

    // @ Information about count of like and dislike
    likeCount: number;

    // @ User Information about like and dislike
    publicationLikeDislike: PublicationLikeDislike = new PublicationLikeDislike();

    constructor(private _likeDislikeService: PublicationLikeDislikeService) {
        this.likeCount = 0;
    }

    ngOnInit(): void {
        this.getLikeCount();
        this.getInformation();
    }


    // #1 Count of like
    getLikeCount(): void {
        this._likeDislikeService.getCountLike(this.publicationId).subscribe(res => {
            this.likeCount = res;
        });
    }

    // #1 User Information about like dislike, click or not
    getInformation(): void {
        this._likeDislikeService.getLikeDislike(this.publicationId, this.userId).subscribe(res => {
            if (res) {
                this.publicationLikeDislike = res;
            }
        });
    }

    // ##2 Click like
    clickLike(): void {
        if (this.publicationLikeDislike.likeHas === 1) {
            this.publicationLikeDislike.publicationId = this.publicationId;
            this.publicationLikeDislike.userId = this.userId;
            this.publicationLikeDislike.likeHas = 0;

            this._likeDislikeService.createLikeDislike(this.publicationLikeDislike).subscribe(res => {
                this.publicationLikeDislike.id = res.id
                this.likeCount = this.likeCount - 1;
            });
        } else {
            this.publicationLikeDislike.publicationId = this.publicationId;
            this.publicationLikeDislike.userId = this.userId;
            this.publicationLikeDislike.likeHas = 1;

            this._likeDislikeService.createLikeDislike(this.publicationLikeDislike).subscribe(res => {
                this.publicationLikeDislike.id = res.id
                this.likeCount = this.likeCount + 1;
            });
        }
    }

}
