import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {TeacherWorkPlaceService} from '../../../../../core/service/teacher-work-place-service';
import {TeacherWorkInfoProfile} from '../../../../../core/models/teacher-work-info-profile';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {TeacherInformationService} from "../../../../../core/service/teacher-information-service";

@Component({
    selector: 'app-teacher-work-history',
    templateUrl: './teacher-work-history.component.html',
    styleUrls: ['./teacher-work-history.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TeacherWorkHistoryComponent implements OnInit, OnChanges {
    // @ Input params
    @Input() teacherId: number;

    // @ Work Place view information
    teacherWorkInfoProfile: TeacherWorkInfoProfile[] = [];

    constructor(private _teacherWorkPlaceService: TeacherWorkPlaceService,
                private _teacherInformationService: TeacherInformationService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.teacherId.firstChange === false) {
            this.ngOnInit();
        }
    }

    ngOnInit(): void {
        this.findAllWorkHistory();
    }


    /***
     * Get All teacher's work history(university)
     * */
    findAllWorkHistory(): void {
        this._teacherWorkPlaceService.findTeacherWorkPlaceHistoryProfile(this.teacherId).subscribe(res => {
            this.teacherWorkInfoProfile = res;
        });
    }

}
