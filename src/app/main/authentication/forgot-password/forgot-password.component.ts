import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuseConfigService} from '../../../../@fuse/services/config.service';
import {RegistrationService} from '../../../core/service/registration-service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {
    // Forgot password params
    forgotPasswordForm: FormGroup;
    emailId: string;
    passwordGenerateStat: boolean;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _registrationService: RegistrationService,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _translateService: TranslateService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.passwordGenerateStat = false;
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }


    /***
     * #1 Create new password
     * */
    createNewPassword(): void {
        this.passwordGenerateStat = true;
        this._registrationService.forgotPassword(this.emailId).subscribe(res => {
            if (res === 'Correct') {
                this._router.navigate(['/message-password']);
            } else {
                this.passwordGenerateStat = false;
                this._snackBar.open(res, this._translateService.instant('FORGOT_PASS.ERROR'), {
                    duration: 3000,
                    verticalPosition: 'top'
                });
            }
        }, error1 => {
            this.passwordGenerateStat = false;
        });
    }

}
