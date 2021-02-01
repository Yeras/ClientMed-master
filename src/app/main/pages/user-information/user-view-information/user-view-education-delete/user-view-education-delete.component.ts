import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {UserEducationService} from '../../../../../core/service/user-education-service';

@Component({
    selector: 'app-user-view-education-delete',
    templateUrl: './user-view-education-delete.component.html',
    styleUrls: ['./user-view-education-delete.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserViewEducationDeleteComponent implements OnInit {
    educationId: number;

    constructor(public matDialogRef: MatDialogRef<UserViewEducationDeleteComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private _educationService: UserEducationService
    ) {
        this.educationId = _data.educationId;
    }

    ngOnInit(): void {
    }

    /***
     * #1 Delete information about education
     * */
    deleteEducationInfo(): void {
        this.matDialogRef.close(this._educationService.deleteEducation(this.educationId).subscribe(resDelete => {
        }, error => {
        }));
    }

}
