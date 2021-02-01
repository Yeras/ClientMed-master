import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-university-followers-view',
    templateUrl: './university-followers-view.component.html',
    styleUrls: ['./university-followers-view.component.scss']
})
export class UniversityFollowersViewComponent implements OnInit {
    // @ Component Input Variable
    @Input() userId: number;


    constructor() {
    }

    ngOnInit(): void {
    }

}
