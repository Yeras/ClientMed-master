import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {UniversityInfoModel} from "../../../../../core/models/university-info-model";
import {CountryModel} from "../../../../../core/models/country-model";
import {CityModel} from "../../../../../core/models/city-model";
import {UniversityModel} from "../../../../../core/models/university-model";
import {CountryService} from "../../../../../core/service/country-service";
import {UniversityService} from "../../../../../core/service/university-service";
import {CityService} from "../../../../../core/service/city-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../../../../../core/models/UserLogin";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {RegistrationService} from "../../../../../core/service/registration-service";
import {UniversityInformationService} from "../../../../../core/service/university-information-service";
import {TranslateService} from "@ngx-translate/core";


@Component({
    selector: 'app-university-registration',
    templateUrl: './university-registration.component.html',
    styleUrls: ['./university-registration.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UniversityRegistrationComponent implements OnInit {
    @Output() refreshAccount = new EventEmitter<string>();

    // @ Registration object
    registerForm: FormGroup;
    userRegistration: UserLogin = new UserLogin();
    universityInfo: UniversityInfoModel = new UniversityInfoModel();

    // @ Information for select
    countryList: CountryModel[] = [];
    cityList: CityModel[] = [];
    universityList: UniversityModel[] = [];

    // @ Changing status
    cleanEducation: boolean;
    checkUserNameStat: boolean;
    checkReloadName: boolean;

    constructor(private _formBuilder: FormBuilder,
                private _registrationService: RegistrationService,
                private _countryService: CountryService,
                private _cityService: CityService,
                private _universityService: UniversityService,
                private _universityInformationService: UniversityInformationService,
                private _translateService: TranslateService,
                private _snackBar: MatSnackBar) {

        this.checkReloadName = true;
    }

    ngOnInit(): void {
        this.registerForm = this.getRegistrationForm();

        this.cleanEducation = true;
        this.getAllCountry();
    }


    // #1 Registration form
    getRegistrationForm(): FormGroup {
        return this._formBuilder.group({
            accountName: ['', Validators.required],
            countryId: ['', Validators.required],
            cityId: ['', Validators.required],
            universityId: ['', [Validators.required]],
            createdDate: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        });
    }

    // #1 Get All country list
    getAllCountry(): void {
        this._countryService.getAllCountry().subscribe(res => {
            this.countryList = res;
        });
    }

    // #1 Get City list by country
    getCityByCountry(countryId: number): void {
        this._cityService.getCityByCountry(countryId).subscribe(res => {

            if (this.cleanEducation === false) {
                this.universityInfo.cityId = null;
                this.universityInfo.universityId = null;
                this.universityInfo.createdDate = null;
            } else {
                this.cleanEducation = false;
            }
            this.cityList = res;
        });
    }

    // #1 Get University list by city
    getUniversityByCity(cityId: number): void {
        this._universityService.getAllUniversityByCity(cityId).subscribe(res => {
            this.universityList = res;
        });
    }

    // #1 Writing email address, reload status for checking account
    reloadCheckStatus(): void {
        this.checkReloadName = true;
    }

    // #1 Check account before creating
    checkAccountName(): void {
        const accountName = this.userRegistration.emailId + '@university.kz';
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

    // ##2 Save user education information
    saveUniversityAccount(): void {

        if (this.userRegistration.passwordConfirm === this.userRegistration.password) {
            this.userRegistration.privatePolicy = this.userRegistration.emailId + ', read and accept private policy';
            this.userRegistration.emailId = this.userRegistration.emailId + '@university.kz';
            this.userRegistration.userActivate = true;

            this._registrationService.registrationUser(this.userRegistration).subscribe(res => {
                this.universityInfo.userId = res.id;

                this._universityInformationService.saveUniversity(this.universityInfo).subscribe(resUniInfo => {
                    this.refreshAccount.emit();
                    this.ngOnInit();
                    this._snackBar.open(this._translateService.instant('ADM_UNIVERSITY.ACCOUNT_CREATED'), this._translateService.instant('ADM_UNIVERSITY.CORRECT'), {
                        duration: 3000,
                        verticalPosition: 'top'
                    });
                });
            }, error => {
                this._snackBar.open(this._translateService.instant('ADM_UNIVERSITY.EMAIL_ACTIVATED'), this._translateService.instant('ADM_UNIVERSITY.ERROR'), {
                    duration: 3000,
                    verticalPosition: 'top'
                });
            });
        } else {
            this._snackBar.open(this._translateService.instant('ADM_UNIVERSITY.NOT_CONFIRMED_PASSWORD'), this._translateService.instant('ADM_UNIVERSITY.ERROR'), {
                duration: 3000,
                verticalPosition: 'top'
            });
        }
    }

}
