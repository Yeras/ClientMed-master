import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    userId: number;


    constructor() {
    }

    ngOnInit(): void {
        this.userId = parseInt(localStorage.getItem('userId'));
    }

}
