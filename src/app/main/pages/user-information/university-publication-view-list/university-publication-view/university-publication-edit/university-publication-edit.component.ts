import {Component, Inject, OnInit} from '@angular/core';
import {NewsPublication} from '../../../../../../core/models/news-publication';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NewsPublicationService} from '../../../../../../core/service/news-publication-service';

@Component({
    selector: 'app-university-publication-edit',
    templateUrl: './university-publication-edit.component.html',
    styleUrls: ['./university-publication-edit.component.scss']
})
export class UniversityPublicationEditComponent implements OnInit {
    // @ Modal Parameter
    userId: number;
    publicationId: number;
    pictureUrl: string;

    // @ Publication Information
    newsPublicationObject: NewsPublication = new NewsPublication();
    pictureUploaded: string;

    // @ Upload File
    currentFileUpload: File;
    previewImg: any;
    uploadedPicture: boolean;

    constructor(public activeModal: MatDialogRef<UniversityPublicationEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _newsPublicationService: NewsPublicationService) {
        this.publicationId = data.publicationId;
        this.pictureUrl = data.pictureUrl;
    }

    ngOnInit(): void {
        if (this.pictureUrl) {
            // this.pictureUploaded = 'http://localhost:8700/publication-control/publication/picture/' + this.publicationId;
            // this.pictureUploaded = 'http://78.140.223.4:8700/publication-control/publication/picture/' + this.publicationId;
            this.pictureUploaded = '/publication-control/publication/picture/' + this.publicationId;
        }
        this.getPublicationInfo();
    }


    /***
     * #1 Information about publication for editing
     * */
    getPublicationInfo(): void {
        this._newsPublicationService.editById(this.publicationId).subscribe(res => {
            this.newsPublicationObject = res;
        });
    }

    /***
     * #2 Delete picture
     * */
    deletePicture(): void {
        this.pictureUrl = null;
        this.uploadedPicture = true;
    }


    /***
     * #2 Select file and view
     * */
    selectFile(event): void {
        this.currentFileUpload = event.target.files[0];

        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            // tslint:disable-next-line:no-shadowed-variable
            reader.onload = (event) => { // called once readAsDataURL is completed
                this.previewImg = event.target.result;
            };
        }
    }

    /***
     * #2 Remove picture
     * */
    cancelPicture(): void {
        this.currentFileUpload = null;
        this.previewImg = null;
    }

    /***
     * ##2 Upload publication
     * */
    saveDataFileProfile(): void {
        this.newsPublicationObject.userId = parseInt(localStorage.getItem('userId'));

        this._newsPublicationService.savePublication(this.newsPublicationObject).subscribe(res => {
            if (this.uploadedPicture) {
                this._newsPublicationService.deletePublicationPicture(this.newsPublicationObject.id).subscribe(resDelete => {
                    if (this.currentFileUpload) {
                        this._newsPublicationService.uploadPublicationPicture(this.currentFileUpload, this.newsPublicationObject.id).subscribe(resFile => {
                            this.activeModal.close('Closed');
                        });
                    } else {
                        this.activeModal.close('Closed');
                    }
                });
            } else if (!this.uploadedPicture) {
                if (this.currentFileUpload) {
                    this._newsPublicationService.uploadPublicationPicture(this.currentFileUpload, this.newsPublicationObject.id).subscribe(resFile => {
                        this.activeModal.close('Closed');
                    });
                } else {
                    this.activeModal.close('Closed');
                }
            }
        });
    }

}
