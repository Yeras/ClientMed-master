import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserInformationService} from '../../../../../core/service/user-information-service';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-user-information-picture',
    templateUrl: './user-information-picture.component.html',
    styleUrls: ['./user-information-picture.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserInformationPictureComponent implements OnInit {
    // @ Getting information from main component
    imgType: string;
    userId: number;

    // @ Upload File
    currentFileUpload: File;
    previewImg: any;

    constructor(public activeModal: MatDialogRef<UserInformationPictureComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private userInformationService: UserInformationService) {
        this.imgType = data.imgType;
        this.userId = data.userId;
    }

    ngOnInit(): void {
    }

    // #1 Select picture
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

    // #2 Save profile photo
    saveDataFileProfile(): void {
        this.userInformationService.uploadUserPicture(this.currentFileUpload, parseInt(localStorage.getItem('userId')))
            .subscribe(res => {
                this.activeModal.close('closed');
            });
    }

    // #2 Save profile background
    saveDataFileBackground(): void {
        this.userInformationService.uploadUserPictureBackground(this.currentFileUpload, parseInt(localStorage.getItem('userId')))
            .subscribe(res => {
                this.activeModal.close('Closed');
            });
    }

}
