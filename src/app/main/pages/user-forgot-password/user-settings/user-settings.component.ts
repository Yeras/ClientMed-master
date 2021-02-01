import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {TermsAndConditionsComponent} from '../../../authentication/terms-and-conditions/terms-and-conditions.component';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationService} from '../../../../core/service/registration-service';
import {UserSettingsDeactivateComponent} from './user-settings-deactivate/user-settings-deactivate.component';
import {AuthService} from '../../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserSettingsComponent implements OnInit {
    // @ Information about user name
    userId: number;
    emailId: string;
    userFirstName: string;
    userLastName: string;
    universityName: string;
    userNameStat: boolean;
    myLanguage: string;

    // @ Change information
    changePasswordStat: boolean;
    changeLanguageStat: boolean;

    constructor(private _authService: AuthService,
                private _registrationService: RegistrationService,
                private _router: Router,
                private _modalService: MatDialog) {
    }

    ngOnInit(): void {
        this.myLanguage = localStorage.getItem('language');

        this.changePasswordStat = false;
        this.changeLanguageStat = false;

        this.userId = parseInt(localStorage.getItem('userId'));
        this.emailId = localStorage.getItem('emailId');

        if (localStorage.getItem('userLastName') == null) {
            this.universityName = localStorage.getItem('userFirstName');
            this.userNameStat = false;
        } else {
            this.userFirstName = localStorage.getItem('userFirstName');
            this.userLastName = localStorage.getItem('userLastName');
            this.userNameStat = true;
        }
    }

    /***
     * #1 Open information about terms and conditions
     * */
    openTermsAndConditions(): void {
        this._modalService.open(TermsAndConditionsComponent, {
            width: '55vh',
            height: '86vh'
        });
    }

    /***
     * #2 Change password
     * */
    changePassword(): void {
        this.changePasswordStat = true;
    }

    /***
     * #3 Accept or cancel changing password
     * */
    acceptChangePassword(changed: any): void {
        this.changePasswordStat = false;
    }

    /***
     * #2 Change language
     * */
    changeLanguage(): void {
        this.changeLanguageStat = true;
    }

    /***
     * #3 Accept or cancel changing language
     * */
    acceptChangeLanguage(changed: any): void {
        this.myLanguage = localStorage.getItem('language');
        this.changeLanguageStat = false;
    }

    /***
     * #2 Deactivate user account/profile,
     * */
    deactivateUserAccount(): void {
        this._modalService.open(UserSettingsDeactivateComponent, {
            width: '60vh',
            height: '43vh'
        }).updatePosition({top: '9%'}).afterClosed().subscribe(res => {
            if (res) {
                this._registrationService.deactivateAccount(parseInt(localStorage.getItem('userId'))).subscribe(resDeactivate => {
                    this._authService.resetAll();
                    this._router.navigate(['/login']);
                });
            }
        });
    }

}
