import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {MatDialog} from '@angular/material/dialog';
import {UserInformationPictureComponent} from '../user-view-information/user-information-picture/user-information-picture.component';
import {UniversityPublicationCreateComponent} from '../university-publication-view-list/university-publication-create/university-publication-create.component';
import {UniversityInfoModel} from '../../../../core/models/university-info-model';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserInformationService} from '../../../../core/service/user-information-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountryService} from '../../../../core/service/country-service';
import {CityService} from '../../../../core/service/city-service';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {UniversityService} from '../../../../core/service/university-service';
import {FollowingService} from '../../../../core/service/following-service';
import {FollowingUser} from '../../../../core/models/following-user';
import {UnfollowRemoveUserModalComponent} from '../unfollow-remove-user-modal/unfollow-remove-user-modal.component';
import {TeacherInformationService} from '../../../../core/service/teacher-information-service';
import {UniversityRatingComponent} from './university-rating/university-rating.component';
import {CountryModel} from '../../../../core/models/country-model';
import {CityModel} from '../../../../core/models/city-model';
import {UniversityModel} from '../../../../core/models/university-model';
import {TeacherWorkPlaceService} from '../../../../core/service/teacher-work-place-service';
import {TeacherWorkInfo} from '../../../../core/models/teacher-work-info';
import {FollowingRequestUser} from '../../../../core/models/following-request-user';
import {FollowingRequestService} from '../../../../core/service/following-request-service';
import {environmentNotification} from '../../../../core/constant/web-const-notification';
import {WebNotificationSend} from '../../../../core/models/web-notification-send';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
    selector: 'app-university-view-information',
    templateUrl: './university-view-information.component.html',
    styleUrls: ['./university-view-information.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UniversityViewInformationComponent implements OnInit, OnChanges {
    // @ http route parameter
    @Input() userId: number;

    // @ Change Engine to sub component
    changeEngine: string;

    // @ University main information view
    form: FormGroup;
    universityInfo: UniversityInfoModel = new UniversityInfoModel();
    universityModel: UniversityModel = new UniversityModel();
    countryName: string;
    cityName: string;
    universityName: string;
    countryList: CountryModel[] = [];
    cityList: CityModel[] = [];

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
    changeCountryStat: boolean;
    teacherProfileStat: boolean;
    teacherWorkRequestStat: boolean;
    teacherWorkYetStat: boolean;

    // @ Following objects
    followingRequestUser: FollowingRequestUser = new FollowingRequestUser();

    // @Teacher Info
    teacherWorkInfoSave: TeacherWorkInfo = new TeacherWorkInfo();

    // @ Socket Message Variable
    serverUrl = environmentNotification.url + 'socket';
    isLoaded = false;
    isCustomSocketOpened = false;
    stompClient;
    webNotificationSend: WebNotificationSend = new WebNotificationSend();

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
                private _followingService: FollowingService,
                private _teacherWorkPlaceService: TeacherWorkPlaceService,
                private _followingRequestService: FollowingRequestService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._universityInformationService.findByUserIdFromList(this.userId).subscribe(res => {
            if (res.length === 0) {
                this._teacherInformationService.findByUserIdFromList(this.userId).subscribe(resTeacher => {
                    if (resTeacher.length === 0) {
                        this._userInformationService.findByUserIdFromList(this.userId).subscribe(resUser => {
                            if (resUser.length === 0) {
                                this._router.navigateByUrl('/404');
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

        this.form = this.createForm();
        this.profilePhoto = '/picture/file/' + this.userId + '?' + this.changePicture;
        // this.profilePhoto = 'http://localhost:8700/picture/file/' + this.userId + '?' + this.changePicture;
        this.getProfileBackgroundImg();
        this.profileBgPicture = '/pictureBg/file/' + this.userId + '?' + this.changePicture;
        // this.profileBgPicture = 'http://localhost:8700/pictureBg/file/' + this.userId + '?' + this.changePicture;

        this.getAllCountry();

        this.getUniversityInformation();
        this.getFollowingInfo();

        // #@ Teacher Profile Stat
        this.teacherProfileStat = false;
        //
        this.teacherWorkRequestStat = false;
        this.teacherWorkYetStat = false;
        this.findTeacherOrNotStat();

        /***
         * OPEN SOCKET
         * */
        this.initializeWebSocketConnection();
    }


    /***
     * #1 Reactive Form
     * */
    createForm(): FormGroup {
        return this._formBuilder.group({
            universityName: ['', Validators.required],
            country: ['', Validators.required],
            city: ['', Validators.required],
            webPage: [''],
            aboutMe: ['']
        });
    }

    /***
     * #1 University Profile background image getting by token
     * */
    getProfileBackgroundImg(): void {
        // fetch('http://localhost:8700/pictureBg/file/' + this.userId + '?' + this.changePicture, {
        fetch('/pictureBg/file/' + this.userId + '?' + this.changePicture, {
            headers: {
                'Authorization': localStorage.getItem('token') // this header is just an example, put your token here
            }
        })
            .then(response => response.blob())
            .then(blob => {
                let img = document.getElementById('image');
                let url = URL.createObjectURL(blob);
                img.style.backgroundImage = `url(${url})`;
            });
    }

    /***
     * #1 Main university information
     * */
    getUniversityInformation(): void {
        this.changeCountryStat = true;
        this._universityInformationService.findByUserId(this.userId).subscribe(res => {
            this.universityInfo = res;

            if (this.userId.toString() === localStorage.getItem('userId')) {
                this.myProfileStat = true;
            } else {
                this.myProfileStat = false;
            }

            if (res.countryId !== null) {
                this.getCityByCountry(res.countryId);
            }

            this.getCountryName();
            this.getCityName();
            this.getUniversityName();
        });
    }

    /***
     * #1 Get Following status
     * */
    getFollowingInfo(): void {
        this._followingService.findFollower(parseInt(localStorage.getItem('userId')), this.userId).subscribe(res => {
            if (res) {
                this.followingUser = res;
                this.followingStat = true;
            } else {
                this.followingStat = false;
            }
        });
    }

    /***
     * #1 All country list for user main information
     * */
    getAllCountry(): void {
        this._countryService.getAllCountry().subscribe(res => {
            this.countryList = res;
        });
    }

    /***
     * #1 Get City list by country
     * @CountryId - choose country id, and this id find all city for this country
     * */
    getCityByCountry(countryId: number): void {
        this._cityService.getCityByCountry(countryId).subscribe(res => {

            if (!this.changeCountryStat) {
                this.universityInfo.cityId = null;
            } else {
                this.changeCountryStat = false;
            }
            this.cityList = res;
        });
    }

    /***
     * #1 View university info - country name
     * */
    getCountryName(): void {
        if (this.universityInfo.countryId !== null) {
            this._countryService.getCountryById(this.universityInfo.countryId).subscribe(res => {
                this.countryName = res.name;
            });
        } else {
            this.countryName = null;
        }
    }

    /***
     * #1 View university info - city name
     * */
    getCityName(): void {
        if (this.universityInfo.cityId !== null) {
            this._cityService.getCityById(this.universityInfo.cityId).subscribe(res => {
                this.cityName = res.name;
            });
        } else {
            this.cityName = null;
        }
    }

    /***
     * #1 View university info - university name
     * */
    getUniversityName(): void {
        if (this.universityInfo.universityId !== null) {
            this._universityService.getUniversityById(this.universityInfo.universityId).subscribe(res => {
                this.universityModel = res;
                // this.universityName = res.name;
            });
        } else {
            this.universityModel.name = null;
            // this.universityName = null;
        }
    }

    /***
     * ##2 Change picture (profile and background)
     * */
    changeImg(imgType: string): void {
        this._modalService.open(UserInformationPictureComponent, {
            data: {
                imgType: imgType,
                userId: this.userId
            },
            width: '75vh',
            height: '55vh'
        }).updatePosition({top: '3%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this.ngOnInit();
            }
        });
    }

    /***
     * ##2 Save university main information
     * */
    save(): void {

        if (this.universityInfo.aboutUniversity !== null) {
            this.universityInfo.aboutUniversity = this.universityInfo.aboutUniversity.trim();
        } else {
            this.universityInfo.aboutUniversity = '';
        }

        if (this.universityInfo.webPage !== null) {
            this.universityInfo.webPage = this.universityInfo.webPage.trim();
        } else {
            this.universityInfo.webPage = '';
        }
        this.universityModel.cityId = this.universityInfo.cityId;

        this._universityInformationService.changeInformation(this.universityInfo).subscribe(res => {
            this.editProfile = !this.editProfile;
            this.saveMainUniversityInfo();
        });
    }

    /***
     * ##2 Save main university information - (name)
     * */
    saveMainUniversityInfo(): void {
        this._universityInformationService.saveMainUniversityInfo(this.universityModel).subscribe(res => {
            this.getUniversityInformation();
            this.changeCountryStat = true;
        });
    }

    /***
     * ##2 Not change(not save) main university information
     * */
    cancel(): void {
        this.editProfile = !this.editProfile;
        this.getUniversityInformation();
    }

    /***
     * ##3 Create new publication
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

    /***
     * ##3 Follow to university
     * */
    followToUser(): void {
        this.followingUser.userId = parseInt(localStorage.getItem('userId'));
        this.followingUser.followedId = this.userId;

        this._followingService.saveFollower(this.followingUser).subscribe(res => {
            this.followingStat = true;
        });
    }

    /***
     * ##4 Delete Following
     * */
    deleteFollowing(): void {
        this._modalService.open(UnfollowRemoveUserModalComponent, {
            data: {removeType: 'removeFollow'},
            width: '55vh',
            // height: '20vh'
        }).updatePosition({top: '10%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this._followingService.deleteFollowing(parseInt(localStorage.getItem('userId')), this.userId).subscribe(resDelete => {
                    this.followingStat = false;
                });
            }
        });
    }

    /***
     * ##5 University Rating view, and if users don't put grade, they can put new rating
     * */
    putGrade(): void {
        this._modalService.open(UniversityRatingComponent, {
            data: {universityId: this.userId}
        }).updatePosition({top: '9%'});
    }

    /*
    * *****************************************
    * If local user = teacher
    * *****************************************
    * */

    /***
     * #1 Check teacher, if local user is teacher, teacher has new button for became new university teacher
     * @UserId = if local userId is teacherId, we show another buttons, for enter or remove from university
     * */
    findTeacherOrNotStat(): void {
        this._teacherInformationService.findByUserIdFromList(parseInt(localStorage.getItem('userId'))).subscribe(resTeacher => {
            if (resTeacher.length === 0) {
                this.teacherProfileStat = false;
            } else {
                this.teacherProfileStat = true;
                this.findWorkStatusByUniversity();
                this.getTeacherRequestInfo();
            }
        });
    }

    /***
     * #1 Working Status
     * @UniversityId
     * @TeacherId = for find working information, if teacher work in this university, show removing button
     * */
    findWorkStatusByUniversity(): void {
        this._teacherWorkPlaceService.findTeacherByUniversityId(this.userId, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            if (res == null) {
                this.teacherWorkYetStat = false;
            } else {
                this.teacherWorkYetStat = true;
                this.teacherWorkInfoSave = res;
            }
        });
    }

    /***
     * #1 Get Information, about requesting to become of teacher
     * */
    getTeacherRequestInfo(): void {
        this._followingRequestService.findRequestInfo(parseInt(localStorage.getItem('userId')), this.userId).subscribe(res => {
            if (res) {
                this.teacherWorkRequestStat = true;
            }
        });
    }

    /***
     * #2 Request to become to teacher
     * */
    becomeTeacherRequest(): void {
        this.followingRequestUser.fromUserId = parseInt(localStorage.getItem('userId'));
        this.followingRequestUser.toUserId = this.userId;

        this._followingRequestService.saveFollowingRequest(this.followingRequestUser).subscribe(res => {
            this.teacherWorkRequestStat = true;
            this.sendRequestToFollow();
        });
    }

    /***
     * #3 Remove request to follow (cancel request to follow)
     * */
    removeRequestToBecomeTeacher(): void {
        this._modalService.open(UnfollowRemoveUserModalComponent, {
            data: {removeType: 'removeRequestTeacher'},
            width: '55vh',
            // height: '25vh'
        }).updatePosition({top: '10%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this._followingRequestService.deleteRequestToFollow(parseInt(localStorage.getItem('userId')), this.userId).subscribe(resDelete => {
                    this.teacherWorkRequestStat = false;
                    this.sendRequestToFollow();
                });
            }
        });
    }

    /***
     * ##4 Leave from this university
     * @TeacherInfoObject - (id)
     * */
    leaveUniversity(): void {
        this._modalService.open(UnfollowRemoveUserModalComponent, {
            data: {removeType: 'leaveUniversity'},
            width: '55vh',
            // height: '25vh'
        }).updatePosition({top: '10%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this._teacherWorkPlaceService.removeToRemove(this.teacherWorkInfoSave).subscribe(res => {
                    this.teacherWorkYetStat = false;
                });
            }
        });
    }

    /********************************************************
     * OPEN SOCKET NOTIFICATION
     * ******************************************************/

    /***
     * ##1 Send Message method
     * */
    sendRequestToFollow(): void {
        this.webNotificationSend.fromId = localStorage.getItem('userId');
        this.webNotificationSend.toId = this.userId.toString();

        // ? Send Request
        this.stompClient.send('/socket-information/create/request', {}, JSON.stringify(this.webNotificationSend));
    }

    /***
     * #2 Socket initialize
     * */
    initializeWebSocketConnection(): void {
        const ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        const that = this;
        this.stompClient.connect({}, function (frame) {
            that.isLoaded = true;
            that.openGlobalSocket();
        });
    }

    /***
     * #2 Socket initialize
     * */
    openGlobalSocket(): void {
        this.openSocket();
        this.stompClient.subscribe('/socket-notification', (message) => {
        });
    }

    /***
     * #2 Socket initialize
     * */
    openSocket(): void {
        this.isCustomSocketOpened = true;
        this.stompClient.subscribe('/socket-notification/' + localStorage.getItem('userId'), (message) => {
        });
    }

}
