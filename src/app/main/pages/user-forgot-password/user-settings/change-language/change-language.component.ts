import {Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {RegistrationService} from '../../../../../core/service/registration-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-change-language',
    templateUrl: './change-language.component.html',
    styleUrls: ['./change-language.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChangeLanguageComponent implements OnInit {
    // @ To Main Component Method Call
    @Output() acceptChangingLanguage = new EventEmitter<boolean>();

    // @ Choose language
    myLanguage: string;

    constructor(private _registrationService: RegistrationService,
                private _snackBar: MatSnackBar,
                private _translateService: TranslateService,
                @Inject('LANGUAGE-LIST') public languageList: any[]) {
    }

    ngOnInit(): void {
        this.myLanguage = localStorage.getItem('language');
    }


    /***
     * #1 Choose language
     * */
    chooseLanguage(language: any): void {
        this.myLanguage = language;
    }

    /***
     * #2 Cancel changing language
     * */
    cancelChangeLanguage(): void {
        this.acceptChangingLanguage.emit(true);
    }

    /***
     * #2 Save changing language
     * */
    saveLanguage(): void {
        this._registrationService.changeLanguage(localStorage.getItem('emailId'), this.myLanguage).subscribe(res => {
            if (res === 'Exception the same') {
                this._snackBar.open(this._translateService.instant('SETTINGS.SAME_LANGUAGE'), this._translateService.instant('SETTINGS.SAVE'), {
                    duration: 3000,
                    verticalPosition: 'top'
                });
                this.acceptChangingLanguage.emit(true);
            } else {
                this._translateService.use(this.myLanguage);

                localStorage.setItem('language', this.myLanguage);
                this._snackBar.open(this._translateService.instant('SETTINGS.LANGUAGE_WAS_CHANGE'),
                    this._translateService.instant('SETTINGS.SAVE'), {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                this.acceptChangingLanguage.emit(true);
            }
        });
    }

}
