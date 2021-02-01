import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {UniversityInformationService} from '../../../core/service/university-information-service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-adm-teacher',
    templateUrl: './adm-teacher.component.html',
    styleUrls: ['./adm-teacher.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AdmTeacherComponent implements OnInit, OnChanges {
    // @ University Access
    universityAccess: boolean;

    constructor(private _universityInformationService: UniversityInformationService,
                private _router: Router) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // this._universityInformationService.findByUserIdFromList(parseInt(localStorage.getItem('userId'))).subscribe(res => {
        //     if (res.length === 0) {
        //         this.universityAccess = false;
        //         this._router.navigateByUrl('/404');
        //     } else {
        //         this.universityAccess = true;
        //     }
        // });
    }

    ngOnInit(): void {
        // this._universityInformationService.findByUserIdFromList(parseInt(localStorage.getItem('userId'))).subscribe(res => {
        //     if (res.length === 0) {
        //         this.universityAccess = false;
        //         this._router.navigateByUrl('/404');
        //     } else {
        //         this.universityAccess = true;
        //     }
        // });
    }

}
