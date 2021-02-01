import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserLogin} from '../../../../../core/models/UserLogin';
import {RegistrationService} from '../../../../../core/service/registration-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {TeacherInfo} from '../../../../../core/models/teacher-info';
import {TeacherInformationService} from '../../../../../core/service/teacher-information-service';
import {TeacherWorkInfo} from '../../../../../core/models/teacher-work-info';
import {TeacherWorkPlaceService} from '../../../../../core/service/teacher-work-place-service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-teacher-registration',
    templateUrl: './teacher-registration.component.html',
    styleUrls: ['./teacher-registration.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TeacherRegistrationComponent implements OnInit {
    @Output() refreshAccount = new EventEmitter<string>();

    // @ Registration object
    registerForm: FormGroup;
    userRegistration: UserLogin = new UserLogin();
    teacherInfo: TeacherInfo = new TeacherInfo();
    teacherWorkInfo: TeacherWorkInfo = new TeacherWorkInfo();

    // @ Changing status
    checkUserNameStat: boolean;
    checkReloadName: boolean;

    constructor(private _formBuilder: FormBuilder,
                private _registrationService: RegistrationService,
                private _teacherInformationService: TeacherInformationService,
                private _teacherWorkPlaceService: TeacherWorkPlaceService,
                private _translateService: TranslateService,
                private _snackBar: MatSnackBar) {

        this.checkReloadName = true;
    }

    ngOnInit(): void {
        this.registerForm = this.getRegistrationForm();
    }


    // #1 Registration form
    getRegistrationForm(): FormGroup {
        return this._formBuilder.group({
            accountName: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            fathersName: [''],
            enterDate: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        });
    }

    // #1 Writing email address, reload status for checking account
    reloadCheckStatus(): void {
        this.checkReloadName = true;
    }

    // #1 Check account before creating
    checkAccountName(): void {
        const accountName = this.userRegistration.emailId + '@med.kz';
        this._registrationService.checkAccountEmail(accountName).subscribe(res => {
            if (accountName.toLowerCase() === res.toLowerCase()) {
                // Can't create with this accountName, because this account name use with another user
                this.checkUserNameStat = true;
            } else {
                // Can create with this accountName
                this.checkUserNameStat = false;
                this.checkReloadName = false;
            }
        });
    }

    // ##2 Save teacher information
    saveUniversityAccount(): void {

        if (this.userRegistration.passwordConfirm === this.userRegistration.password) {
            this.userRegistration.privatePolicy = this.userRegistration.emailId + ', read and accept private policy';
            this.userRegistration.emailId = this.userRegistration.emailId + '@med.kz';
            this.userRegistration.userActivate = true;

            // ? Teacher Account Registration
            this._registrationService.registrationUser(this.userRegistration).subscribe(res => {
                this.teacherInfo.userId = res.id;

                // ? Teacher Information Create
                this._teacherInformationService.saveTeacher(this.teacherInfo).subscribe(resUniInfo => {
                    this.teacherWorkInfo.userTeacherId = res.id;
                    this.teacherWorkInfo.userUniversityId = parseInt(localStorage.getItem('userId'));

                    // ? Teacher Work Place Create
                    // this._teacherWorkPlaceService.saveToWork(this.teacherWorkInfo).subscribe(resWork => {
                    //     this.refreshAccount.emit();
                    //     this.ngOnInit();
                    //     this._snackBar.open(this._translateService.instant('ADM_TEACHER.ACCOUNT_CREATED'), this._translateService.instant('ADM_TEACHER.CORRECT'), {
                    //         duration: 3000,
                    //         verticalPosition: 'top'
                    //     });
                    // });

                });
            }, error => {
                this._snackBar.open(this._translateService.instant('ADM_TEACHER.EMAIL_ACTIVATED'), this._translateService.instant('ADM_TEACHER.ERROR'), {
                    duration: 3000,
                    verticalPosition: 'top'
                });
                this.userRegistration.emailId = null;
            });
        } else {
            this._snackBar.open(this._translateService.instant('ADM_TEACHER.NOT_CONFIRMED_PASSWORD'), this._translateService.instant('ADM_TEACHER.ERROR'), {
                duration: 3000,
                verticalPosition: 'top'
            });
            this.userRegistration.emailId = null;
        }
    }

}
