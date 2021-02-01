import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseConfigService} from '../../../../@fuse/services/config.service';
import {FormBuilder} from '@angular/forms';
import {fuseAnimations} from '../../../../@fuse/animations';

@Component({
    selector: 'app-open-email-change-password',
    templateUrl: './open-email-change-password.component.html',
    styleUrls: ['./open-email-change-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OpenEmailChangePasswordComponent implements OnInit {

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder
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

    ngOnInit(): void {
    }

}
