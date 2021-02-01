import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NewsPublicationService} from '../../../../../../core/service/news-publication-service';

@Component({
    selector: 'app-university-publication-delete',
    templateUrl: './university-publication-delete.component.html',
    styleUrls: ['./university-publication-delete.component.scss']
})
export class UniversityPublicationDeleteComponent implements OnInit {
    // @ Modal Parameter
    publicationId: number;

    constructor(public activeModal: MatDialogRef<UniversityPublicationDeleteComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _newsPublicationService: NewsPublicationService) {
        this.publicationId = data.publicationId;
    }

    ngOnInit(): void {
    }


    deletePublication(): void {
        this._newsPublicationService.deletePublicationById(this.publicationId).subscribe(res => {
            this.activeModal.close('Deleted');
        });
    }

}
