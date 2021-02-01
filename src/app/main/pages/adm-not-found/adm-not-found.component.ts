import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';

@Component({
    selector: 'app-adm-not-found',
    templateUrl: './adm-not-found.component.html',
    styleUrls: ['./adm-not-found.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AdmNotFoundComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
