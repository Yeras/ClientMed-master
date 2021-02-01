import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {UserInfo} from '../../../../core/models/user-info';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserEducationService} from '../../../../core/service/user-education-service';
import {UserInformationService} from '../../../../core/service/user-information-service';
import {MatDialog} from '@angular/material/dialog';
import {UserInformationPictureComponent} from './user-information-picture/user-information-picture.component';
import {CountryService} from '../../../../core/service/country-service';
import {CountryModel} from '../../../../core/models/country-model';
import {CityService} from '../../../../core/service/city-service';
import {CityModel} from '../../../../core/models/city-model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserEducationInfoModel} from '../../../../core/models/user-education-info-model';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {TeacherInformationService} from '../../../../core/service/teacher-information-service';
import {FollowingRequestService} from '../../../../core/service/following-request-service';
import {FollowingRequestUser} from '../../../../core/models/following-request-user';
import {FollowingService} from '../../../../core/service/following-service';
import {UnfollowRemoveUserModalComponent} from '../unfollow-remove-user-modal/unfollow-remove-user-modal.component';
import {WriteMessageComponent} from '../write-message/write-message.component';
import {UniversityPublicationCreateComponent} from '../university-publication-view-list/university-publication-create/university-publication-create.component';
import {environmentNotification} from '../../../../core/constant/web-const-notification';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {WebNotificationSend} from '../../../../core/models/web-notification-send';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-user-view-information',
    templateUrl: './user-view-information.component.html',
    styleUrls: ['./user-view-information.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserViewInformationComponent implements OnInit, OnChanges {
    // @ http route parameter
    @Input() userId: number;

    // @ User main information view
    form: FormGroup;
    userInfo: UserInfo = new UserInfo();
    countryList: CountryModel[] = [];
    cityList: CityModel[] = [];

    // @ Change Engine to sub component, for reload page
    changeEngine: string;

    // @ User education information view
    userEducationList: UserEducationInfoModel[] = [];
    countryName: string;
    cityName: string;
    profilePhoto: string;
    profileBgPicture: string;

    // @ View Stat changing
    myProfileStat: boolean;
    editProfile: boolean;
    editEducation: boolean;
    changeCountryStat: boolean;
    changePicture: any;
    followingRequestStat: boolean;
    followingStat: boolean;

    // @ Following objects
    followingRequestUser: FollowingRequestUser = new FollowingRequestUser();

    // @ Socket Message Variable
    serverUrl = environmentNotification.url + 'socket';
    isLoaded = false;
    isCustomSocketOpened = false;
    stompClient;
    webNotificationSend: WebNotificationSend = new WebNotificationSend();

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _translateService: TranslateService,
                private _snackBar: MatSnackBar,
                private _userInformationService: UserInformationService,
                private _userEducationService: UserEducationService,
                private _formBuilder: FormBuilder,
                private _modalService: MatDialog,
                private _countryService: CountryService,
                private _cityService: CityService,
                private _matDialog: MatDialog,
                private _universityInformationService: UniversityInformationService,
                private _teacherInformationService: TeacherInformationService,
                private _followingRequestService: FollowingRequestService,
                private _followingService: FollowingService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._userInformationService.findByUserIdFromList(this.userId).subscribe(res => {
            if (res.length === 0) {
                this._teacherInformationService.findByUserIdFromList(this.userId).subscribe(resTeacher => {
                    if (resTeacher.length === 0) {
                        this._universityInformationService.findByUserIdFromList(this.userId).subscribe(resUniversity => {
                            if (resUniversity.length === 0) {
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
        this.followingRequestStat = false;
        this.followingStat = false;

        // #@ After ngOnChanges, reload this params
        this.changeCountryStat = true;
        this.editProfile = true;
        this.editEducation = true;
        // #@ After ngOnChanges, reload this params

        this.form = this.createForm();
        this.profilePhoto = '/picture/file/' + this.userId + '?' + this.changePicture;
        // this.profilePhoto = 'http://localhost:8700/picture/file/' + this.userId + '?' + this.changePicture;
        this.getProfileBackgroundImg();
        this.profileBgPicture = '/pictureBg/file/' + this.userId + '?' + this.changePicture;
        // this.profileBgPicture = 'http://localhost:8700/pictureBg/file/' + this.userId + '?' + this.changePicture;

        this.getUserInformation();
        this.getUserEducation();

        if (this.userId.toString() !== localStorage.getItem('userId')) {
            this.getFollowingRequestInfo();
            this.getFollowingStatInfo();
        }

        this.getAllCountry();

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
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            fathersName: [''],
            country: ['', Validators.required],
            city: [''],
            birthday: [''],
            aboutMe: ['']
        });
    }

    /***
     * #1 User Profile background image getting by token
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
     * #1 User main information
     * */
    getUserInformation(): void {
        this._userInformationService.findByUserId(this.userId).subscribe(res => {
            this.userInfo = res;

            if (this.userInfo.fathersName == null) {
                this.userInfo.fathersName = '';
            }

            if (this.userId.toString() === localStorage.getItem('userId')) {
                this.myProfileStat = true;
            } else {
                this.myProfileStat = false;
            }

            if (res.countryId !== null) {
                this.getCityByCountry(res.countryId);
            }

            // #2 User information view
            this.getCountryName();
            this.getCityName();
        }, error1 => {
        });
    }

    /***
     * #1 User education information
     * */
    getUserEducation(): void {
        this._userEducationService.getUserEducationInfo(this.userId).subscribe(res => {
            this.userEducationList = res;
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
     * */
    getCityByCountry(countryId: number): void {
        this._cityService.getCityByCountry(countryId).subscribe(res => {

            if (this.changeCountryStat === false) {
                this.userInfo.cityId = null;
            } else {
                this.changeCountryStat = false;
            }
            this.cityList = res;
        });
    }

    /***
     * #1 Get Information, about requesting to follow
     * */
    getFollowingRequestInfo(): void {
        this._followingRequestService.findRequestInfo(parseInt(localStorage.getItem('userId')), this.userId).subscribe(res => {
            if (res) {
                this.followingRequestStat = true;
            }
        });
    }

    /***
     * #1 Get Information, about following, if function return data, it means, main user to following
     * */
    getFollowingStatInfo(): void {
        this._followingService.findFollower(parseInt(localStorage.getItem('userId')), this.userId).subscribe(res => {
            if (res) {
                this.followingStat = true;
            }
        });
    }

    /***
     * #2 View user info - country
     * */
    getCountryName(): void {

        if (this.userInfo.countryId !== null) {
            this._countryService.getCountryById(this.userInfo.countryId).subscribe(res => {
                this.countryName = res.name;
            });
        } else {
            this.countryName = null;
        }
    }

    /***
     * #2 View user info - city
     * */
    getCityName(): void {

        if (this.userInfo.cityId !== null) {
            this._cityService.getCityById(this.userInfo.cityId).subscribe(res => {
                this.cityName = res.name;
            });
        } else {
            this.cityName = null;
        }
    }

    /***
     * ##2 Save user main information
     * */
    save(): void {
        if (this.userInfo.firstName.trim() === '' || this.userInfo.lastName.trim() === '') {
            this._snackBar.open(this._translateService.instant('USER_INFORMATION_USER_VIEW.FIRST_LAST_NAME_MUST_FULL'),
                this._translateService.instant('USER_INFORMATION_USER_VIEW.ERROR'), {
                    duration: 3000,
                    verticalPosition: 'top'
                });
        } else {
            this._userInformationService.saveUserProfile(this.userInfo).subscribe(res => {
                this.editProfile = !this.editProfile;
                this.ngOnInit();
                // this.getUserInformation();
            });
        }
    }

    /***
     * ##2 Not change(not save) main user information
     * */
    cancel(): void {
        // this.getUserInformation();
        this.editProfile = !this.editProfile;
        this.ngOnInit();
    }

    /***
     * ##2 User picture
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

    /***
     * #3 Call this method from child component
     * */
    refreshFromChanging(): void {
        this.ngOnInit();
    }

    /***
     * #4 Follow to this user
     * */
    following(): void {
        this.followingRequestUser.fromUserId = parseInt(localStorage.getItem('userId'));
        this.followingRequestUser.toUserId = this.userId;

        this._followingRequestService.saveFollowingRequest(this.followingRequestUser).subscribe(res => {
            this.followingRequestStat = true;
            this.sendRequestToFollow();
        });
    }

    /***
     * #5 Remove request to follow (cancel request to follow)
     * */
    removeRequestFollow(): void {
        this._modalService.open(UnfollowRemoveUserModalComponent, {
            data: {removeType: 'removeRequest'},
            width: '55vh',
            // height: '25vh'
        }).updatePosition({top: '10%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this._followingRequestService.deleteRequestToFollow(parseInt(localStorage.getItem('userId')), this.userId).subscribe(resDelete => {
                    this.followingRequestStat = false;
                    this.sendRequestToFollow();
                });
            }
        });
    }

    /***
     * #6 UnFollow to user (remove following)
     * */
    unFollowToUser(): void {
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
     * #6 Send Message to user
     * */
    sendMessage(): void {
        this._modalService.open(WriteMessageComponent, {
            data: {toUserId: this.userId},
            width: '55vh',
            height: '40vh'
        }).updatePosition({top: '10%'});
    }

    /********************************************************
     * OPEN SOCKET NOTIFICATION
     * ******************************************************/

    /***
     * ##1 Send request method
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
