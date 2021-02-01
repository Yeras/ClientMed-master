import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {UserInformationService} from "../../../core/service/user-information-service";
import {UniversityInformationService} from "../../../core/service/university-information-service";
import {TeacherInformationService} from "../../../core/service/teacher-information-service";

@Component({
    selector: 'app-user-information',
    templateUrl: './user-information.component.html',
    styleUrls: ['./user-information.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserInformationComponent implements OnInit {
    // @ http route parameter
    userId: number;

    // @ Type of users
    userInformationStat: boolean;
    teacherInformationStat: boolean;
    universityInformationStat: boolean;

    constructor(private _route: ActivatedRoute,
                private _userInformationService: UserInformationService,
                private _universityInformationService: UniversityInformationService,
                private _teacherInformationService: TeacherInformationService,
                private _router: Router) {
    }

    ngOnInit(): void {
        this._route.params.subscribe(params => {
                this.userId = params.userId;
                this.findUser();
                this.findUniversity();
                this.findTeacher();
            }
        );
    }

    // # Find inside of users
    findUser(): void {
        this._userInformationService.findByUserIdFromList(this.userId).subscribe(res => {
            if (res.length === 0) {
                this.userInformationStat = false;
            } else {
                this.userInformationStat = true;
            }
        });
    }

    // # Find inside of teachers
    findTeacher(): void {
        this._teacherInformationService.findByUserIdFromList(this.userId).subscribe(res => {
            if (res.length === 0) {
                this.teacherInformationStat = false;
            } else {
                this.teacherInformationStat = true;
            }
        });
    }

    // # Find inside of universities
    findUniversity(): void {
        this._universityInformationService.findByUserIdFromList(this.userId).subscribe(res => {
            if (res.length === 0) {
                this.universityInformationStat = false;
            } else {
                this.universityInformationStat = true;
            }
        });
    }

}
