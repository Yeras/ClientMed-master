import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FuseConfigService} from '../../../../@fuse/services/config.service';

@Component({
    selector: 'app-open-email-message',
    templateUrl: './open-email-message.component.html',
    styleUrls: ['./open-email-message.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OpenEmailMessageComponent implements OnInit {

    constructor(private _fuseConfigService: FuseConfigService) {
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
