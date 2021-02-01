import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {NewsPublicationService} from '../../../../core/service/news-publication-service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-publication-one-page-view',
    templateUrl: './publication-one-page-view.component.html',
    styleUrls: ['./publication-one-page-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PublicationOnePageViewComponent implements OnInit, OnChanges {
    // @ Main attribute
    @Input() publicationId: number;
    @Input() userId: number;

    publicationHasStat: boolean;

    constructor(private _newsPublicationService: NewsPublicationService,
                private _router: Router) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        try {
            if (!changes.publicationId.firstChange || !changes.userId.firstChange) {
                if (!changes.publicationId.firstChange || !changes.userId.firstChange) {
                    this._newsPublicationService.editById(this.publicationId).subscribe(res => {
                        if (res == null) {
                            this.publicationHasStat = true;
                            this._router.navigateByUrl('/404');
                        } else {
                            this.ngOnInit();
                        }
                    });
                }
            }
        } catch (e) {
            try {
                if (!changes.publicationId.firstChange) {
                    if (!changes.publicationId.firstChange || !changes.userId.firstChange) {
                        this._newsPublicationService.editById(this.publicationId).subscribe(res => {
                            if (res == null) {
                                this.publicationHasStat = true;
                                this._router.navigateByUrl('/404');
                            } else {
                                this.ngOnInit();
                            }
                        });
                    }
                }
            } catch (e) {
            }
            try {
                if (!changes.userId.firstChange) {
                    if (!changes.publicationId.firstChange || !changes.userId.firstChange) {
                        this._newsPublicationService.editById(this.publicationId).subscribe(res => {
                            if (res == null) {
                                this.publicationHasStat = true;
                                this._router.navigateByUrl('/404');
                            } else {
                                this.ngOnInit();
                            }
                        });
                    }
                }
            } catch (e) {
            }
        }


        // if (!changes.publicationId.firstChange || !changes.userId.firstChange) {
        //     this._newsPublicationService.editById(this.publicationId).subscribe(res => {
        //         if (res == null) {
        //             this.publicationHasStat = true;
        //             this._router.navigateByUrl('/404');
        //         } else {
        //             this.ngOnInit();
        //         }
        //     });
        // }
    }

    ngOnInit(): void {
        console.log('Change: ');
        this.findPublication();
    }


    /***
     * #1 find publication
     * */
    findPublication(): void {
        this._newsPublicationService.editById(this.publicationId).subscribe(res => {
            console.log('USER ID ONE PAGE: ', this.userId);
            console.log('USER ID ONE PAGE RES: ', res.userId);

            if (res == null) {
                this.publicationHasStat = true;
                this._router.navigateByUrl('/404');
            } else if (res.userId.toString() !== this.userId) {
                this._router.navigateByUrl('/404');
            }
        });
    }

}
