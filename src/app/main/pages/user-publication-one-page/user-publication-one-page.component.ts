import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsPublicationService} from '../../../core/service/news-publication-service';
import {UserInformationService} from "../../../core/service/user-information-service";

@Component({
    selector: 'app-user-publication-one-page',
    templateUrl: './user-publication-one-page.component.html',
    styleUrls: ['./user-publication-one-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserPublicationOnePageComponent implements OnInit, OnChanges {
    // @ Main attribute
    publicationId: number;
    userId: number;

    constructor(private _route: ActivatedRoute,
                private _newsPublicationService: NewsPublicationService,
                private _router: Router) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        try {
            if (!changes.publicationId.firstChange || !changes.userId.firstChange) {
                this.ngOnInit();
            }
        } catch (e) {
            try {
                if (!changes.publicationId.firstChange) {
                    this.ngOnInit();
                }
            } catch (e) {
            }
            try {
                if (!changes.userId.firstChange) {
                    this.ngOnInit();
                }
            } catch (e) {
            }
        }
    }

    ngOnInit(): void {
        this._route.params.subscribe(params => {
            this.publicationId = params.publicationId;
            this.userId = params.userId;

            this._newsPublicationService.editById(this.publicationId).subscribe(res => {
                if (res.userId.toString() !== params.userId) {
                    this._router.navigateByUrl('/404');
                }
            }, error1 => {
                console.log('ERROR: ', error1);
            });
        });
    }

}
