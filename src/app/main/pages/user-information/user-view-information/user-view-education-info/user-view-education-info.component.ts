import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {UserEducationService} from '../../../../../core/service/user-education-service';
import {UserEducationInfoModel} from '../../../../../core/models/user-education-info-model';
import {CountryService} from '../../../../../core/service/country-service';
import {CityService} from '../../../../../core/service/city-service';
import {UniversityService} from '../../../../../core/service/university-service';
import {FacultyService} from '../../../../../core/service/faculty-service';
import {SpecialtyService} from '../../../../../core/service/specialty-service';
import {CountryModel} from '../../../../../core/models/country-model';
import {CityModel} from '../../../../../core/models/city-model';
import {UniversityModel} from '../../../../../core/models/university-model';
import {FacultyModel} from '../../../../../core/models/faculty-model';
import {SpecialtyModel} from '../../../../../core/models/specialty-model';
import {DegreeService} from '../../../../../core/service/degree-service';
import {DegreeModel} from '../../../../../core/models/degree-model';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {UserViewEducationDeleteComponent} from '../user-view-education-delete/user-view-education-delete.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-user-view-education-info',
    templateUrl: './user-view-education-info.component.html',
    styleUrls: ['./user-view-education-info.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserViewEducationInfoComponent implements OnInit {
    @Input() userEducationId: number;
    @Output() refreshParentView = new EventEmitter<string>();

    // @ User education information view
    userEducationObject: UserEducationInfoModel = new UserEducationInfoModel();
    countryName: string;
    cityName: string;
    universityName: string;
    facultyName: string;
    specialtyName: string;
    degreeName: string;

    // @ Information for select
    countryList: CountryModel[] = [];
    cityList: CityModel[] = [];
    universityList: UniversityModel[] = [];
    facultyList: FacultyModel[] = [];
    specialtyList: SpecialtyModel[] = [];
    degreeList: DegreeModel[] = [];

    // @ View Stat changing
    myProfileStat: boolean;
    editEducation: boolean;
    cleanEducation: boolean;
    cleanEducationUniversity: boolean;

    constructor(private _userEducationService: UserEducationService,
                private _countryService: CountryService,
                private _cityService: CityService,
                private _universityService: UniversityService,
                private _facultyService: FacultyService,
                private _specialtyService: SpecialtyService,
                private _degreeService: DegreeService,
                private _translateService: TranslateService,
                private _matDialog: MatDialog,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.cleanEducation = true;
        this.cleanEducationUniversity = true;

        if (this.userEducationId !== 0) {
            this.editEducation = true;
            this.getEducationInfo();
        } else {
            this.cleanEducation = false;
            this.cleanEducationUniversity = false;
            this.userEducationObject.id = 0;
            this.myProfileStat = true;
            this.editEducation = false;
            this.userEducationObject.userInfoId = parseInt(localStorage.getItem('userId'));
        }

        this.getAllCountry();
        this.getAllFaculty();
        this.getAllDegree();
    }


    // #1 User education info
    getEducationInfo(): void {
        this._userEducationService.getById(this.userEducationId).subscribe(res => {

            if (res.userInfoId.toString() === localStorage.getItem('userId')) {
                this.myProfileStat = true;
            } else {
                this.myProfileStat = false;
            }

            this.userEducationObject = res;

            // #2 User information view
            this.getCountryName();
            this.getCityName();
            this.getUniversityName();
            this.getFacultyName();
            this.getSpecialtyName();
            this.getDegreeName();

            // #2 User Information edit selection
            if (res.countryId !== null) {
                this.getCityByCountry(res.countryId);
            }
            if (res.cityId !== null) {
                this.getUniversityByCity(res.cityId);
            }
            if (res.facultyId !== null) {
                this.getSpecialtyByFaculty(res.facultyId);
            }

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
                this.userEducationObject.specialtyId = null;
                this.userEducationObject.degreeId = null;
                this.userEducationObject.facultyId = null;
                this.userEducationObject.universityId = null;
                this.userEducationObject.cityId = null;
                this.userEducationObject.finish = null;
                this.userEducationObject.enter = null;
            } else {
                this.cleanEducation = false;
            }
            this.cityList = res;
        });
    }

    // #1 Get University list by city
    getUniversityByCity(cityId: number): void {
        this._universityService.getAllUniversityByCity(cityId).subscribe(res => {

            if (this.cleanEducationUniversity === false) {
                this.userEducationObject.specialtyId = null;
                this.userEducationObject.degreeId = null;
                this.userEducationObject.facultyId = null;
                this.userEducationObject.universityId = null;
                this.userEducationObject.finish = null;
                this.userEducationObject.enter = null;
            } else {
                this.cleanEducationUniversity = false;
            }

            this.universityList = res;
        });
    }

    // #1 Get All faculty list
    getAllFaculty(): void {
        this._facultyService.getAllFaculty().subscribe(res => {
            this.facultyList = res;
        });
    }

    // #1 Get Specialty list by faculty
    getSpecialtyByFaculty(facultyId: number): void {
        this._specialtyService.getAllSpecialtyByFaculty(facultyId).subscribe(res => {
            this.specialtyList = res;
        });
    }

    // #1 Get All degree list
    getAllDegree(): void {
        this._degreeService.getAllDegree().subscribe(res => {
            this.degreeList = res;
        });
    }

    // #2 View user info - country
    getCountryName(): void {

        if (this.userEducationObject.countryId !== null) {
            this._countryService.getCountryById(this.userEducationObject.countryId).subscribe(res => {
                this.countryName = res.name;
            });
        } else {
            this.countryName = null;
        }
    }

    // #2 View user info - city
    getCityName(): void {

        if (this.userEducationObject.cityId !== null) {
            this._cityService.getCityById(this.userEducationObject.cityId).subscribe(res => {
                this.cityName = res.name;
            });
        } else {
            this.cityName = null;
        }
    }

    // #2 View user info - university
    getUniversityName(): void {

        if (this.userEducationObject.universityId !== null) {
            this._universityService.getUniversityById(this.userEducationObject.universityId).subscribe(res => {
                this.universityName = res.name;
            });
        } else {
            this.universityName = null;
        }
    }

    // #2 View user info - faculty
    getFacultyName(): void {

        if (this.userEducationObject.facultyId !== null) {
            this._facultyService.getFacultyById(this.userEducationObject.facultyId).subscribe(res => {
                this.facultyName = res.name;
            });
        } else {
            this.facultyName = null;
        }
    }

    // #2 View user info - specialty
    getSpecialtyName(): void {

        if (this.userEducationObject.specialtyId !== null) {
            this._specialtyService.getSpecialtyById(this.userEducationObject.specialtyId).subscribe(res => {
                this.specialtyName = res.name;
            });
        } else {
            this.specialtyName = null;
        }
    }

    // #2 View user info - degree
    getDegreeName(): void {

        if (this.userEducationObject.degreeId !== null) {
            this._degreeService.getDegreeById(this.userEducationObject.degreeId).subscribe(res => {
                this.degreeName = res.name;
            });
        } else {
            this.degreeName = null;
        }
    }

    // ##2 Save user education information
    saveEducation(): void {

        if (this.userEducationObject.universityId == null) {
            this._snackBar.open(this._translateService.instant('USER_INFORMATION_USER_VIEW.CHOOSE_COUNTRY_CITY_UNIVERSITY'),
                this._translateService.instant('USER_INFORMATION_USER_VIEW.ERROR'), {
                    duration: 3000,
                    verticalPosition: 'top'
                });

        } else {
            this._userEducationService.saveEducation(this.userEducationObject).subscribe(res => {
                /***Call Parent method*/
                this.refreshParentView.emit();
                /***Call Parent method*/
            });
        }
    }

    // ##2 Not change(not save) education user information
    cancelEducation(): void {
        /***Call Main method*/
        this.refreshParentView.emit();
        /***Call Main method*/
    }

    // ##2 Delete education information
    deleteEducation(educationId: number): void {
        this._matDialog.open(UserViewEducationDeleteComponent, {
            data: {
                educationId: educationId
            },
            width: '50vh'
        }).updatePosition({top: '10%'})
            .afterClosed().subscribe(res => {
            /***
             * Call Main method
             * */
            if (res) {
                this.refreshParentView.emit();
            }
        });
    }

}
