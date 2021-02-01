import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-adm-university',
    templateUrl: './adm-university.component.html',
    styleUrls: ['./adm-university.component.scss']
})
export class AdmUniversityComponent implements OnInit {
    yerasAccess: string;
    yerasGiveAccess: string;

    constructor(private _router: Router) {
    }

    ngOnInit(): void {
        // Yeras Account
        this.yerasGiveAccess = 'yeraskz@gmail.com';
        this.yerasAccess = localStorage.getItem('emailId');
    }

}
