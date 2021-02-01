import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../../../@fuse/animations';
import {TeacherAchievement} from '../../../../../../core/models/teacher-achievement';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AchievementInformationService} from '../../../../../../core/service/achievement-information-service';
import {AchievementInfo} from '../../../../../../core/models/achievement-info';
import {TeacherAchievementService} from '../../../../../../core/service/teacher-achievement-service';

@Component({
    selector: 'app-achievement-view-edit',
    templateUrl: './achievement-view-edit.component.html',
    styleUrls: ['./achievement-view-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,

})
export class AchievementViewEditComponent implements OnInit {
    @Input() teacherAchievementId: number;
    @Input() userId: number;
    @Output() refreshParentView = new EventEmitter<string>();
    @Output() refreshParentViewSave = new EventEmitter<string>();

    // @ Achievement create
    form: FormGroup;
    achievementStat: boolean;
    achievementInfoList: AchievementInfo[] = [];
    teacherAchievementObject: TeacherAchievement = new TeacherAchievement();
    achievementInfo: AchievementInfo = new AchievementInfo();

    // @ Edit Achievement information
    editAchievementStat: boolean;

    constructor(private _formBuilder: FormBuilder,
                private _achievementInfoService: AchievementInformationService,
                private _teacherAchievementService: TeacherAchievementService) {
    }

    ngOnInit(): void {

        if (this.userId.toString() === localStorage.getItem('userId')) {
            this.achievementStat = true;
        }

        this.form = this.createForm();
        this.findAllAchievementType();

        if (this.teacherAchievementId !== 0) {
            this.findTeacherAchievementById();
        }
    }


    /***
     * #1 Reactive Form (create)
     * */
    createForm(): FormGroup {
        return this._formBuilder.group({
            achievement: ['', Validators.required],
            description: ['', Validators.required],
            achievementDate: ['', Validators.required]
        });
    }

    /***
     * #1 List of all achievements
     * */
    findAllAchievementType(): void {
        const params = 'page=' + 0 + '&size=' + 99999999;

        this._achievementInfoService.findAllAchievement(params).subscribe(res => {
            this.achievementInfoList = res.list;
        });
    }

    /***
     * #2 Find info for edit and view
     * */
    findTeacherAchievementById(): void {
        this._teacherAchievementService.findById(this.teacherAchievementId).subscribe(res => {
            this.teacherAchievementObject = res;

            // @ Info about achievement
            this.findAchievementInfoById();
        });
    }

    /***
     * #2 Find achievement info for edit and view
     * */
    findAchievementInfoById(): void {
        this._achievementInfoService.findById(this.teacherAchievementObject.achievementId).subscribe(res => {
            this.achievementInfo = res;
        });
    }

    /***
     * ##3 Save new achievement
     * */
    saveNewAchievement(): void {
        this.teacherAchievementObject.userId = parseInt(localStorage.getItem('userId'));

        this._teacherAchievementService.saveAchievement(this.teacherAchievementObject).subscribe(res => {
            this.refreshParentViewSave.emit();
        });
    }

    /***
     * ##3 Cancel new achievement
     * */
    cancelNewAchievement(): void {
        this.refreshParentView.emit();
    }

    /***
     * ##4 Edit achievement (cancel)
     * */
    cancelEditAchievement(): void {
        this.editAchievementStat = false;

        this.ngOnInit();
    }

    /***
     * ##4 Edit achievement (delete)
     * */
    deleteAchievement(): void {
        this._teacherAchievementService.deleteById(this.teacherAchievementId).subscribe(res => {
            this.refreshParentViewSave.emit();
        });
    }

    /***
     * ##4 Edit achievement (save changing)
     * */
    saveChange(): void {
        this._teacherAchievementService.saveAchievement(this.teacherAchievementObject).subscribe(res => {
            this.refreshParentViewSave.emit();
        });
    }

}
