import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-user-settings-deactivate',
    templateUrl: './user-settings-deactivate.component.html',
    styleUrls: ['./user-settings-deactivate.component.scss']
})
export class UserSettingsDeactivateComponent implements OnInit {

    constructor(public activeModal: MatDialogRef<UserSettingsDeactivateComponent>) {
    }

    ngOnInit(): void {
    }


    /***
     * #1 Deactivate account
     * */
    deactivateAccount(): void {
        this.activeModal.close('deactivate');
    }

}
