import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-university-teachers',
    templateUrl: './university-teachers.component.html',
    styleUrls: ['./university-teachers.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UniversityTeachersComponent implements OnInit {
    // @ Router param
    universityId: number;

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
                this.universityId = params.universityId;
            }
        );
    }

    ngOnInit(): void {
    }

}
