import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FuseConfigService} from '../../../../@fuse/services/config.service';
import {RegistrationService} from '../../../core/service/registration-service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-user-activation',
    templateUrl: './user-activation.component.html',
    styleUrls: ['./user-activation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserActivationComponent implements OnInit {
    tokenActivation: string;

    // @ Check token, if token was activated before, show message that user activated account before
    userAccountStatByToken: boolean;
    tokenValidationStat: boolean;

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
        const url: string = window.location.href;
        this.tokenActivation = url.substring(url.indexOf('?'));

        setTimeout(() => {
            this.accountActivation(this.tokenActivation);
        }, 100);
    }


    /***
     * #1 Activate user account
     * */
    accountActivation(activationToken: string): void {
        this._registrationService.userActivationStat(activationToken).subscribe(res => {
            if (res) {
                this.userAccountStatByToken = true;
            } else {
                this.userAccountStatByToken = false;
                this._registrationService.userAccountActivation(activationToken).subscribe(resActivate => {
                    if (resActivate) {
                        this.tokenValidationStat = true;
                    } else {
                        this.tokenValidationStat = false;
                    }
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
