import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RegistrationService} from '../../../../../core/service/registration-service';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChangePasswordComponent implements OnInit {
    // @ To Main Component Method Call
    @Output() acceptNewPassword = new EventEmitter<boolean>();

    // @ Information about change, from to
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;

    // @ Change password form object
    changePassForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private _snackBar: MatSnackBar,
                private _translateService: TranslateService,
                private _registrationService: RegistrationService) {
    }


    ngOnInit(): void {
        this.changePassForm = this._formBuilder.group({
            oldPass: ['', Validators.required],
            newPass: ['', Validators.minLength(8)],
            confirmPass: ['', Validators.required]
        });
    }


    /***
     * #1 Change Password
     * */
    changePassword(): void {
        if (this.newPassword !== this.confirmNewPassword) {
            this._snackBar.open(this._translateService.instant('SETTINGS.NOT_CONFIRMED_PASSWORD'), this._translateService.instant('SETTINGS.NOT_EQUAL'), {
                duration: 4000,
                verticalPosition: 'top'
            });
        } else {
            this._registrationService.changePassword(localStorage.getItem('emailId'), this.oldPassword, this.newPassword).subscribe(res => {
                if (res === 'Exception the same') {
                    this._snackBar.open(this._translateService.instant('SETTINGS.OLD_NEW_PASSWORD_CANT'), this._translateService.instant('SETTINGS.ERROR'), {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                } else if (res === 'Exception not the same') {
                    this._snackBar.open(this._translateService.instant('SETTINGS.OLD_PASSWORD_NOT_CORRECT'), this._translateService.instant('SETTINGS.ERROR'), {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                } else {
                    this._snackBar.open(res, this._translateService.instant('SETTINGS.SAVE'), {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                    this.acceptNewPassword.emit(true);
                }
            });
        }
    }

    /***
     * #1 Cancel changing password
     * */
    cancelChangePassword(): void {
        this.acceptNewPassword.emit(true);
    }

}
