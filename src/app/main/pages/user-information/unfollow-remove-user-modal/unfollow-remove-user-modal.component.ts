import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-unfollow-remove-user-modal',
    templateUrl: './unfollow-remove-user-modal.component.html',
    styleUrls: ['./unfollow-remove-user-modal.component.scss']
})
export class UnfollowRemoveUserModalComponent implements OnInit {
    removeType: string;


    constructor(public activeModal: MatDialogRef<UnfollowRemoveUserModalComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any) {
        this.removeType = _data.removeType;
    }

    ngOnInit(): void {
    }

}
