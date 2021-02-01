import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

import {FuseConfigService} from '@fuse/services/config.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {navigation} from 'app/navigation/navigation';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {RegistrationService} from '../../../core/service/registration-service';
import {UserInfo} from '../../../core/models/user-info';
import {UserInformationService} from '../../../core/service/user-information-service';
import {UniversityInformationService} from '../../../core/service/university-information-service';
import {UniversityService} from '../../../core/service/university-service';
import {TeacherInformationService} from '../../../core/service/teacher-information-service';
import {FollowingResponseService} from '../../../core/service/following-response-service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {FormGroup} from '@angular/forms';
import {environmentNotification} from '../../../core/constant/web-const-notification';
import {WebChattingNotificationService} from '../../../core/service/web-chatting-notification-service';
import {environment} from '../../../core/models/web-const-environment';
import {environmentChatToolbar} from '../../../core/constant/web-const-chat-toolbar-path';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    // @ View configuration
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    navigation: any;
    yerasMail: string;
    yerasMailAccess: string;

    // @ User Information
    userInformation: UserInfo = new UserInfo();
    userId: number;

    // @ User information view
    userFirstName: string;
    userLastName: string;
    universityName: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    // @ Type of users
    userInformationStat: boolean;
    teacherInformationStat: boolean;
    universityInformationStat: boolean;

    // @ Searching Object
    searchName: string;

    // @ Object stat
    mouseFocusedStat: boolean;

    // @ Notification information
    followingResponseLength: number;
    followingRequestLength: number;
    newMessageStat: boolean;

    // @ Socket Notification Variable
    serverUrl = environmentNotification.url + 'socket';
    isLoaded = false;
    isCustomSocketOpened = false;
    stompClient;
    form: FormGroup;

    // @ Socket new Message Variable
    serverUrlMessage = environment.url + 'socket';
    isLoadedMessage = false;
    isCustomSocketOpenedMessage = false;
    stompClientMessage;

    // @ Socket delete new chat notification
    serverUrlMessageDelete = environmentChatToolbar.url + 'socket';
    isLoadedMessageDelete = false;
    isCustomSocketOpenedMessageDelete = false;
    stompClientMessageDelete;

    // @ Choose page
    chooseHomeStat: boolean;
    chooseUniversityStat: boolean;
    chooseAdmUniversityStat: boolean;
    chooseAdmTeacherStat: boolean;
    chooseNotificationStat: boolean;
    chooseChattingStat: boolean;

    constructor(private _fuseConfigService: FuseConfigService,
                private _fuseSidebarService: FuseSidebarService,
                private _translateService: TranslateService,
                private _router: Router,
                private _authService: AuthService,
                private _registrationService: RegistrationService,
                private _userInformationService: UserInformationService,
                private _universityInformationService: UniversityInformationService,
                private _universityService: UniversityService,
                private _teacherInformationService: TeacherInformationService,
                private _followingResponseService: FollowingResponseService,
                private _webChattingNotificationService: WebChattingNotificationService) {
        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        if (localStorage.getItem('token') !== null) {
            this._translateService.use(localStorage.getItem('language'));
            this.yerasMailAccess = 'yeraskz@gmail.com';
            this.yerasMail = localStorage.getItem('emailId');

            this.userId = parseInt(localStorage.getItem('userId'));

            /***
             * ? Notification
             * */
            this.getResponseList();
            this.getRequestList();
            this.getInformationAboutNewMessage();

            this.userGroupType();

            // Subscribe to the config changes
            this._fuseConfigService.config
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((settings) => {
                    this.horizontalNavbar = settings.layout.navbar.position === 'top';
                    this.rightNavbar = settings.layout.navbar.position === 'right';
                    this.hiddenNavbar = settings.layout.navbar.hidden === true;
                });

            /***
             * Open socket
             * */
            this.initializeWebSocketConnection();
            this.initializeWebSocketConnectionNewMessage();
            this.initializeWebSocketConnectionDeleteChatNotification();
        }
    }

    /***
     * #1 Get user type
     * */
    userGroupType(): void {

        // ? User group - user
        this._userInformationService.findByUserIdFromList(this.userId).subscribe(res => {
            if (res.length === 0) {
                this.userInformationStat = false;
            } else {
                this._userInformationService.findByUserId(parseInt(localStorage.getItem('userId'))).subscribe(resUser => {
                    localStorage.setItem('userFirstName', resUser.firstName);
                    localStorage.setItem('userLastName', resUser.lastName);

                    this.userFirstName = resUser.firstName;
                    this.userLastName = resUser.lastName;
                });
                this.userInformationStat = true;
            }
        });

        // ? User group - university
        this._universityInformationService.findByUserIdFromList(this.userId).subscribe(res => {
            if (res.length === 0) {
                this.universityInformationStat = false;
            } else {
                this._universityInformationService.findByUserId(parseInt(localStorage.getItem('userId'))).subscribe(resUniversity => {
                    this._universityService.getUniversityById(resUniversity.universityId).subscribe(resUniversityName => {
                        localStorage.setItem('userFirstName', resUniversityName.name);

                        this.universityName = resUniversityName.name;
                    });
                    this.userInformation = resUniversity;
                });
                this.universityInformationStat = true;
            }
        });

        // ? User group - teacher
        this._teacherInformationService.findByUserIdFromList(this.userId).subscribe(res => {
            if (res.length === 0) {
                this.teacherInformationStat = false;
            } else {
                this._teacherInformationService.findByUserId(parseInt(localStorage.getItem('userId'))).subscribe(resUser => {
                    localStorage.setItem('userFirstName', resUser.firstName);
                    localStorage.setItem('userLastName', resUser.lastName);

                    this.userFirstName = resUser.firstName;
                    this.userLastName = resUser.lastName;
                });
                this.teacherInformationStat = true;
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Your search here...
    }

    /***
     * LOGOUT FROM WUK
     * */
    // tslint:disable-next-line:typedef
    logout() {
        this._authService.resetAll();
        this._router.navigate(['/login']);
    }

    /***
     * #1 Get all information about request to follow
     * */
    getRequestList(): void {
        const params = 'page=' + 0 + '&size=' + 1;
        this._followingResponseService.findAllByToUserId(params, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            this.followingRequestLength = res.list.length;
        });
    }

    /***
     * #1 Get all information about response, if give access to follow
     * */
    getResponseList(): void {
        const params = 'page=' + 0 + '&size=' + 1;
        this._followingResponseService.findAllByFromUserId(params, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            this.followingResponseLength = res.list.length;
        });
    }

    /***
     * #1 Get information about new message
     * */
    getInformationAboutNewMessage(): void {
        this._webChattingNotificationService.findAllByUserId(parseInt(localStorage.getItem('userId'))).subscribe(res => {
            if (res.length !== 0) {
                this.newMessageStat = true;
            } else {
                this.newMessageStat = false;
            }
        });
    }

    /***
     * #3 Input search icon view
     * */
    mouseFocused(): void {
        this.mouseFocusedStat = true;
    }

    /***
     * #3 Input search icon view
     * */
    mouseNotFocused(): void {
        setTimeout(() => {
            this.mouseFocusedStat = false;
        }, 100);
    }

    /***
     * #4 Choose page
     * */
    choosePage(pageName: string): void {

        if (pageName === 'home') {
            this.chooseHomeStat = true;
            this.chooseUniversityStat = false;
            this.chooseAdmUniversityStat = false;
            this.chooseAdmTeacherStat = false;
            this.chooseNotificationStat = false;
            this.chooseChattingStat = false;
        } else if (pageName === 'university') {
            this.chooseUniversityStat = true;
            this.chooseHomeStat = false;
            this.chooseAdmUniversityStat = false;
            this.chooseAdmTeacherStat = false;
            this.chooseNotificationStat = false;
            this.chooseChattingStat = false;
        } else if (pageName === 'AdmUniversity') {
            this.chooseAdmUniversityStat = true;
            this.chooseHomeStat = false;
            this.chooseUniversityStat = false;
            this.chooseAdmTeacherStat = false;
            this.chooseNotificationStat = false;
            this.chooseChattingStat = false;
        } else if (pageName === 'AdmTeacher') {
            this.chooseAdmTeacherStat = true;
            this.chooseHomeStat = false;
            this.chooseUniversityStat = false;
            this.chooseAdmUniversityStat = false;
            this.chooseNotificationStat = false;
            this.chooseChattingStat = false;
        } else if (pageName === 'notification') {
            this.chooseNotificationStat = true;
            this.chooseHomeStat = false;
            this.chooseUniversityStat = false;
            this.chooseAdmUniversityStat = false;
            this.chooseAdmTeacherStat = false;
            this.chooseChattingStat = false;
        } else if (pageName === 'chatting') {
            this.chooseChattingStat = true;
            this.chooseHomeStat = false;
            this.chooseUniversityStat = false;
            this.chooseAdmUniversityStat = false;
            this.chooseAdmTeacherStat = false;
            this.chooseNotificationStat = false;
        } else {
            this.chooseHomeStat = false;
            this.chooseUniversityStat = false;
            this.chooseAdmUniversityStat = false;
            this.chooseAdmTeacherStat = false;
            this.chooseNotificationStat = false;
            this.chooseChattingStat = false;
        }
    }

    /***********************************************
     * OPEN SOCKET
     * *********************************************/

    /***
     * #1 Socket initialize for notification
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
     * #1 Socket initialize for notification
     * */
    openGlobalSocket(): void {
        this.openSocket();
        this.stompClient.subscribe('/socket-information', (message) => {
            this.handleResult(message);
        });
    }

    /***
     * #1 Socket initialize for notification
     * */
    openSocket(): void {
        this.isCustomSocketOpened = true;
        this.stompClient.subscribe('/socket-notification/' + localStorage.getItem('userId'), (message) => {
            this.handleResult(message);
        });
    }

    /***
     * #1 Socket initialize for notification
     * */
    handleResult(message: any): void {
        this.getResponseList();
        this.getRequestList();
    }

    /***
     * #2 Socket initialize for new message
     * */
    initializeWebSocketConnectionNewMessage(): void {
        const ws = new SockJS(this.serverUrlMessage);
        this.stompClientMessage = Stomp.over(ws);
        const that = this;
        this.stompClientMessage.connect({}, function (frame) {
            that.isLoadedMessage = true;
            that.openGlobalSocketNewMessage();
        });
    }

    /***
     * #2 Socket initialize for new message
     * */
    openGlobalSocketNewMessage(): void {
        this.openSocketNewMessage();
        this.stompClientMessage.subscribe('/socket-publisher', (message) => {
            this.handleResultNewMessage(message);
        });
    }

    /***
     * #2 Socket initialize for new message
     * */
    openSocketNewMessage(): void {
        this.isCustomSocketOpenedMessage = true;
        this.stompClientMessage.subscribe('/socket-publisher/' + localStorage.getItem('userId'), (message) => {
            this.handleResultNewMessage(message);
        });
    }

    /***
     * #2 Socket initialize for new message
     * */
    handleResultNewMessage(message: any): void {
        this.getInformationAboutNewMessage();
    }

    /***
     * #3 Socket initialize for deleting opened chat notification
     * */
    initializeWebSocketConnectionDeleteChatNotification(): void {
        const ws = new SockJS(this.serverUrlMessageDelete);
        this.stompClientMessageDelete = Stomp.over(ws);
        const that = this;
        this.stompClientMessageDelete.connect({}, function (frame) {
            that.isLoadedMessageDelete = true;
            that.openGlobalSocketDeleteChatNotification();
        });
    }

    /***
     * #3 Socket initialize for deleting opened chat notification
     * */
    openGlobalSocketDeleteChatNotification(): void {
        this.openSocketDeleteChatNotification();
        this.stompClientMessageDelete.subscribe('/socket-chat', (message) => {
            this.handleResultDeleteChatNotification(message);
        });
    }

    /***
     * #3 Socket initialize for deleting opened chat notification
     * */
    openSocketDeleteChatNotification(): void {
        this.isCustomSocketOpenedMessageDelete = true;
        this.stompClientMessageDelete.subscribe('/socket-chat/' + localStorage.getItem('userId'), (message) => {
            this.handleResultDeleteChatNotification(message);
        });
    }

    /***
     * #3 Socket initialize for deleting opened chat notification
     * */
    handleResultDeleteChatNotification(message: any): void {
        this.getInformationAboutNewMessage();
    }

}
