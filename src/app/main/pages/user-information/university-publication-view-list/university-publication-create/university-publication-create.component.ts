import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NewsPublicationService} from '../../../../../core/service/news-publication-service';
import {NewsPublication} from '../../../../../core/models/news-publication';

@Component({
    selector: 'app-university-publication-create',
    templateUrl: './university-publication-create.component.html',
    styleUrls: ['./university-publication-create.component.scss']
})
export class UniversityPublicationCreateComponent implements OnInit {
    // @ Modal Parameter
    userId: number;

    // @ Publication Information
    newsPublicationObject: NewsPublication = new NewsPublication();

    // @ Upload File
    currentFileUpload: File;
    previewImg: any;

    constructor(public activeModal: MatDialogRef<UniversityPublicationCreateComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _newsPublicationService: NewsPublicationService) {
        this.userId = data.userId;
    }

    ngOnInit(): void {
    }


    // #1 Select file and view
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

    // #2 Remove picture
    cancelPicture(): void {
        this.currentFileUpload = null;
        this.previewImg = null;
    }

    // ##2 Upload publication
    saveDataFileProfile(): void {
        this.newsPublicationObject.userId = parseInt(localStorage.getItem('userId'));

        this._newsPublicationService.savePublication(this.newsPublicationObject).subscribe(res => {
            if (this.currentFileUpload) {
                this._newsPublicationService.uploadPublicationPicture(this.currentFileUpload, res.id).subscribe(resFile => {
                    this.activeModal.close('Closed');
                });
            } else {
                this.activeModal.close('Closed');
            }
        });
    }

}
