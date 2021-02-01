import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FuseConfigService} from '../../../../@fuse/services/config.service';
import {RegistrationService} from '../../../core/service/registration-service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-user-activation-password',
    templateUrl: './user-activation-password.component.html',
    styleUrls: ['./user-activation-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserActivationPasswordComponent implements OnInit {
    tokenActivationPassword: string;

    // @ Check token, if token was activated before, show message that user activated account before
    userAccountStatByToken: boolean;
    tokenValidationStat: boolean;
    passwordExceptionMessage: string;

    constructor(private _fuseConfigService: FuseConfigService,
                private _registrationService: RegistrationService,
                private _translateService: TranslateService,
                @Inject('LANGUAGE-LIST') public languageList: any[]) {
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

    ngOnInit(): void {
        this.tokenValidationStat = false;

        const url: string = window.location.href;
        this.tokenActivationPassword = url.substring(url.indexOf('?'));

        setTimeout(() => {
            this.accountActivation(this.tokenActivationPassword);
        }, 100);
    }


    /***
     * #1 User password was changed
     * */
    accountActivation(activationTokenPassword: string): void {
        this._registrationService.activateForgotNewPassword(activationTokenPassword).subscribe(res => {
            if (res === 'Correct') {
                this.tokenValidationStat = true;
            } else {
                this.tokenValidationStat = false;
                this.passwordExceptionMessage = res;
            }
        }, error1 => {
        });
    }

    /***
     * #2 Choose language for translating
     * */
    chooseLanguage(language: string): void {
        this._translateService.use(language);
    }

}
