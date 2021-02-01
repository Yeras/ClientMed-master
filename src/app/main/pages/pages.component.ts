import {Component, OnInit} from '@angular/core';
import {FuseNavigation} from '../../../@fuse/types';
import {Subject} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {FuseNavigationService} from '../../../@fuse/components/navigation/navigation.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
    navigation: FuseNavigation[];

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private authService: AuthService,
        private _fuseNavigationService: FuseNavigationService) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        console.log(localStorage.getItem('token'));
    }


}
