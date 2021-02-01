import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AchievementInformationService} from '../../../../core/service/achievement-information-service';

@Component({
    selector: 'app-achievement-registration',
    templateUrl: './achievement-registration.component.html',
    styleUrls: ['./achievement-registration.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AchievementRegistrationComponent implements OnInit {
    @Output() refreshAccount = new EventEmitter<string>();

    // @ Registration object
    registerForm: FormGroup;
    achievementName: string;
    achievementDescription: string;
    achievementWebPage: string;

    // @ Changing status
    checkFile: boolean;

    // @ Upload File
    currentFileUpload: File;
    fileName: string;

    constructor(private _formBuilder: FormBuilder,
                private _achievementInfoService: AchievementInformationService) {
    }

    ngOnInit(): void {
        this.registerForm = this.getRegistrationForm();

        // ? Upload Picture
        this.fileName = '';
        this.checkFile = false;
    }


    /***
     * #1 Registration form
     * */
    getRegistrationForm(): FormGroup {
        return this._formBuilder.group({
            name: ['', Validators.required]
        });
    }

    /***
     * #1 Select file
     * */
    selectFile(event): void {
        this.currentFileUpload = event.target.files.item(0);

        if (this.currentFileUpload !== null) {
            this.fileName = this.currentFileUpload.name;
            this.checkFile = true;
        } else {
            this.fileName = '';
            this.checkFile = false;
        }
    }

    /***
     * ##2 Create new achievement
     * */
    createAchievement(): void {
        this._achievementInfoService.createNewAchievement(this.currentFileUpload, this.achievementName).subscribe(res => {
            this.achievementName = '';
            this.refreshAccount.emit();
        });
    }

}



