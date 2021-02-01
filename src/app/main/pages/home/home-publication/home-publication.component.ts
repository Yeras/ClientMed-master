import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {UniversityInfoModel} from '../../../../core/models/university-info-model';
import {FollowingUser} from '../../../../core/models/following-user';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {CountryService} from '../../../../core/service/country-service';
import {CityService} from '../../../../core/service/city-service';
import {UniversityService} from '../../../../core/service/university-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {UserInformationService} from '../../../../core/service/user-information-service';
import {TeacherInformationService} from '../../../../core/service/teacher-information-service';
import {FollowingService} from '../../../../core/service/following-service';
import {UniversityPublicationCreateComponent} from '../../user-information/university-publication-view-list/university-publication-create/university-publication-create.component';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-home-publication',
    templateUrl: './home-publication.component.html',
    styleUrls: ['./home-publication.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class HomePublicationComponent implements OnInit, OnChanges {
    // @ http route parameter
    @Input() userId: number;

    // @ Change Engine to sub component
    changeEngine: string;

    // @ University main information view
    universityInfo: UniversityInfoModel = new UniversityInfoModel();
    countryName: string;
    cityName: string;
    universityName: string;

    // @ Profile picture
    profilePhoto: string;
    profileBgPicture: string;

    // @ Following information
    followingUser: FollowingUser = new FollowingUser();

    // @ View Stat changing
    myProfileStat: boolean;
    editProfile: boolean;
    changePicture: any;
    followingStat: boolean;

    constructor(private _universityInformationService: UniversityInformationService,
                private _countryService: CountryService,
                private _cityService: CityService,
                private _universityService: UniversityService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _snackBar: MatSnackBar,
                private _formBuilder: FormBuilder,
                private _modalService: MatDialog,
                private _matDialog: MatDialog,
                private _userInformationService: UserInformationService,
                private _teacherInformationService: TeacherInformationService,
                private _followingService: FollowingService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._universityInformationService.findByUserIdFromList(this.userId).subscribe(res => {
            if (res.length === 0) {
                this._teacherInformationService.findByUserIdFromList(this.userId).subscribe(resTeacher => {
                    if (resTeacher.length === 0) {
                        this._userInformationService.findByUserIdFromList(this.userId).subscribe(resUser => {
                            if (resUser.length === 0) {
                                this._router.navigateByUrl('/home');
                            }
                        });
                    }
                });
            } else {
                if (changes.userId.firstChange === false) {
                    this.ngOnInit();
                }
            }
        });
    }

    ngOnInit(): void {
        this.changePicture = (new Date()).getTime();

        this.changeEngine = 'Engine';
        // #@ After ngOnChanges, reload this params
        this.editProfile = true;
        // #@ After ngOnChanges, reload this params

        // this.profilePhoto = 'http://localhost:8700/picture/file/' + this.userId + '?' + this.changePicture;
        this.profilePhoto = '/picture/file/' + this.userId + '?' + this.changePicture;
        // this.profileBgPicture = 'http://localhost:8700/pictureBg/file/' + this.userId + '?' + this.changePicture;
        this.profileBgPicture = '/pictureBg/file/' + this.userId + '?' + this.changePicture;

        this.getUniversityInformation();
    }


    /***
     * #1 Main university information
     * */
    getUniversityInformation(): void {
        this._universityInformationService.findByUserId(this.userId).subscribe(res => {
            this.universityInfo = res;

            if (this.userId.toString() === localStorage.getItem('userId')) {
                this.myProfileStat = true;
            } else {
                this.myProfileStat = false;
            }
        });
    }


    /***
     * ##2 Create new publication
     * */
    createNewPublication(): void {
        this._modalService.open(UniversityPublicationCreateComponent, {
            data: {
                userId: this.userId
            },
            maxWidth: '65vh !important',
            maxHeight: '80vh',
            width: '55vh',
            height: '50vh'
        }).updatePosition({top: '5%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this.changeEngine = this.changeEngine + ' - ' + Date.now();
            }
        });
    }

}
