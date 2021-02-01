import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations/index';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RegistrationService} from '../../../core/service/registration-service';
import {UserLogin} from 'app/core/models/UserLogin';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    userLogin: UserLogin = new UserLogin();

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService,
        private _snackBar: MatSnackBar,
        private _registrationService: RegistrationService,
        private _translateService: TranslateService,
        @Inject('LANGUAGE-LIST') public languageList: any[]
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
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }


    /***
     * #1 Login user, for entering to the web page
     * */
    loginUser(): void {
        this._registrationService.userAccountStatus(this.userLogin.emailId).subscribe(resStatus => {
            if (resStatus) {
                this._registrationService.getToken(this.userLogin).subscribe(resToken => {
                    localStorage.setItem('token', resToken.headers.get('authorization'));
                    this._registrationService.loginUserFromRemote(this.userLogin).subscribe(res => {
                        localStorage.setItem('emailId', res.emailId);
                        localStorage.setItem('userId', res.id);
                        localStorage.setItem('language', res.languageType);

                        this._translateService.use(res.languageType);
                        this._router.navigate(['/home']);
                    });
                }, error => {
                    this._snackBar.open(this._translateService.instant('LOGIN.INVALID_EMAIL_PASSWORD'), this._translateService.instant('LOGIN.ERROR'), {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                });
            } else {
                this._snackBar.open(this._translateService.instant('LOGIN.ACCOUNT_NOT_AUTHORIZED'), this._translateService.instant('LOGIN.ERROR'), {
                    duration: 3000,
                    verticalPosition: 'top'
                });
            }
        });
    }

    /***
     * #2 Choose language for translating
     * */
    chooseLanguage(language: string): void {
        this._translateService.use(language);
    }

}
