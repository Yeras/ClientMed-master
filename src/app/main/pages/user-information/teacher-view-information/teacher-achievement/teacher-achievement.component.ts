import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {TeacherAchievementService} from '../../../../../core/service/teacher-achievement-service';
import {TeacherAchievement} from '../../../../../core/models/teacher-achievement';

@Component({
    selector: 'app-teacher-achievement',
    templateUrl: './teacher-achievement.component.html',
    styleUrls: ['./teacher-achievement.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TeacherAchievementComponent implements OnInit {
    // @ From Main Page
    userId: number;
    editAchievement: boolean;
    createAchievement: boolean;

    // @ Teacher Achievement
    teacherAchievementList: TeacherAchievement[] = [];

    constructor(public activeModal: MatDialogRef<TeacherAchievementComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private _teacherAchievementService: TeacherAchievementService) {
        this.userId = _data.teacherId;
    }

    ngOnInit(): void {

        if (this.userId.toString() === localStorage.getItem('userId')) {
            this.createAchievement = true;
        }

        this.editAchievement = false;
        this.findAllAchievement();
    }


    /***
     * #1 Find All Teacher's achievement
     * */
    findAllAchievement(): void {
        const params = 'page=' + 0 + '&size=' + 9999999;

        this._teacherAchievementService.findAllAchievement(params, this.userId).subscribe(res => {
            this.teacherAchievementList = res.list;
        });
    }

    /***
     * ##2 Create new achievement
     * */
    createNewAchievement(): void {
        this.editAchievement = true;
    }

    /***
     * #3 Reload after create/edit
     * */
    refreshFromChangingForCancel(): void {
        this.editAchievement = false;
    }

    /***
     * #3 Reload after create/edit
     * */
    refreshFromChangingForSave(): void {
        this.editAchievement = false;
        this.findAllAchievement();
    }

}
