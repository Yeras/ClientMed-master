import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';

@Component({
    selector: 'app-universities-view',
    templateUrl: './universities-view.component.html',
    styleUrls: ['./universities-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UniversitiesViewComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
