import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {fuseAnimations} from '../../../../@fuse/animations';

@Component({
    selector: 'app-user-following-full',
    templateUrl: './user-following-full.component.html',
    styleUrls: ['./user-following-full.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserFollowingFullComponent implements OnInit {
    // @ Router param
    userId: number;

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
                this.userId = params.userId;
            }
        );
    }

    ngOnInit(): void {
    }

}
