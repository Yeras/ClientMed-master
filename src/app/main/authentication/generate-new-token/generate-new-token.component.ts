import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FuseConfigService} from '../../../../@fuse/services/config.service';
import {RegistrationService} from '../../../core/service/registration-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-generate-new-token',
    templateUrl: './generate-new-token.component.html',
    styleUrls: ['./generate-new-token.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class GenerateNewTokenComponent implements OnInit {
    // @ Token Params
    tokenRegenerateForm: FormGroup;
    emailId: string;
    tokenGenerateStat: boolean;

    constructor(private _fuseConfigService: FuseConfigService,
                private _formBuilder: FormBuilder,
                private _registrationService: RegistrationService,
                private _router: Router,
                private _snackBar: MatSnackBar,
                private _translateService: TranslateService) {
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
        this.tokenGenerateStat = false;
        this.tokenRegenerateForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }


    /***
     * #1 Regenerated expired token
     * */
    regenerateToken(): void {
        this.tokenGenerateStat = true;
        this._registrationService.tokenRegenerate(this.emailId).subscribe(res => {
            if (res === 'Token regenerated') {
                this._router.navigate(['/message']);
            } else {
                this.tokenGenerateStat = false;
                this._snackBar.open(res, this._translateService.instant('GENERATE_TOKEN.ERROR'), {
                    duration: 3000,
                    verticalPosition: 'top'
                });
            }
        }, error1 => {
            this.tokenGenerateStat = false;
        });
    }

}
