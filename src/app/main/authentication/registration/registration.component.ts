import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseConfigService} from '../../../../@fuse/services/config.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserLogin} from '../../../core/models/UserLogin';
import {RegistrationService} from '../../../core/service/registration-service';
import {fuseAnimations} from '../../../../@fuse/animations';
import {UserInfo} from '../../../core/models/user-info';
import {UserInformationService} from '../../../core/service/user-information-service';
import {MatDialog} from '@angular/material/dialog';
import {TermsAndConditionsComponent} from '../terms-and-conditions/terms-and-conditions.component';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegistrationComponent implements OnInit {
    userRegistration: UserLogin = new UserLogin();
    userInformation: UserInfo = new UserInfo();
    privatePolicy: boolean;
    registrationButtonStat: boolean;

    registerForm: FormGroup;

    constructor(private _fuseConfigService: FuseConfigService,
                private _formBuilder: FormBuilder,
                private _router: Router,
                private _authService: AuthService,
                private _snackBar: MatSnackBar,
                private _registrationService: RegistrationService,
                private _userInformationService: UserInformationService,
                private _translateService: TranslateService,
                private _modalService: MatDialog) {
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

        this.privatePolicy = false;
    }

    ngOnInit(): void {
        this.registrationButtonStat = false;
        this.registerForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            fathersName: [''],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.minLength(8)],
            passwordConfirm: ['', Validators.required]
        });
    }


    registration(): void {
        this.registrationButtonStat = true;
        if (this.privatePolicy === true) {
            this.userRegistration.privatePolicy = 'I\'m ' + this.userInformation.lastName + ' ' + this.userInformation.firstName + ', read and accept private policy';
            this.userRegistration.userActivate = false;
            if (this.userRegistration.passwordConfirm === this.userRegistration.password) {
                this._registrationService.registrationUser(this.userRegistration).subscribe(res => {
                    this.userInformation.userId = res.id;

                    this._userInformationService.saveUser(this.userInformation).subscribe(resUser => {
                        this._router.navigate(['/login']);
                    });
                }, error => {
                    this.registrationButtonStat = false;
                    this._snackBar.open(this._translateService.instant('REGISTRATION.EMAIL_ACTIVATED'), this._translateService.instant('REGISTRATION.ERROR'), {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                });
            } else {
                this.registrationButtonStat = false;
                this._snackBar.open(this._translateService.instant('REGISTRATION.NOT_CONFIRMED_PASSWORD'), this._translateService.instant('REGISTRATION.ERROR'), {
                    duration: 3000,
                    verticalPosition: 'top'
                });
            }
        } else {
            this.registrationButtonStat = false;
            this._snackBar.open(this._translateService.instant('REGISTRATION.READ_PRIVATE_POLICY'), this._translateService.instant('REGISTRATION.ERROR'), {
                duration: 3000,
                verticalPosition: 'top'
            });
        }
    }

    /***
     * #2 Terms and conditions window
     * */
    openTermsAndConditions(): void {
        this._modalService.open(TermsAndConditionsComponent, {
            width: '55vh',
            height: '86vh'
        });
    }

}
