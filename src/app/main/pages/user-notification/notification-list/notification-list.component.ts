import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FollowingResponseService} from '../../../../core/service/following-response-service';
import {FollowingRequestService} from '../../../../core/service/following-request-service';
import {FollowingRequestResponseObject} from '../../../../core/models/following-request-response-object';
import {UniversityInformationService} from '../../../../core/service/university-information-service';
import {environmentNotification} from "../../../../core/constant/web-const-notification";
import {WebNotificationSend} from "../../../../core/models/web-notification-send";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NotificationListComponent implements OnInit {
    // Notification information list
    followingRequestList: FollowingRequestResponseObject[] = [];
    followingResponseList: FollowingRequestResponseObject[] = [];

    // @ Request list length (quantity)
    followingRequestLength: number;
    followingResponseLength: number;

    // @ Stat - only for University
    universityUserAccount: boolean;

    // @ Choose type of notification
    requestNotificationStat: boolean;
    responseNotificationStat: boolean;

    // @ Page new data for scroll
    pageScroll: number;
    pageSizeScroll: number;

    // @ Socket Message Variable
    serverUrl = environmentNotification.url + 'socket';
    isLoaded = false;
    isCustomSocketOpened = false;
    stompClient;
    webNotificationSend: WebNotificationSend = new WebNotificationSend();
    webNotificationSendAccept: WebNotificationSend = new WebNotificationSend();

    constructor(private _followingResponseService: FollowingResponseService,
                private _followingRequestService: FollowingRequestService,
                private _universityInformationService: UniversityInformationService) {
    }

    ngOnInit(): void {
        this.pageScroll = 0;
        this.pageSizeScroll = 20;

        this.requestNotificationStat = true;
        this.universityUserAccount = false;

        this.getUserType();

        this.getRequestList(this.pageScroll, this.pageSizeScroll);
        this.getResponseList(this.pageScroll, this.pageSizeScroll);

        /***
         * OPEN SOCKET
         * */
        this.initializeWebSocketConnection();
    }


    /***
     * #1 Type of user (Difference only for university)
     * */
    getUserType(): void {
        this._universityInformationService.findByUserIdFromList(parseInt(localStorage.getItem('userId'))).subscribe(res => {
            if (res.length !== 0) {
                this.universityUserAccount = true;
            }
        });
    }

    /***
     * #1 Get all information about request to follow
     * */
    getRequestList(page: number, pageSize: number): void {
        const params = 'page=' + page + '&size=' + pageSize;

        this._followingResponseService.findAllByToUserId(params, parseInt(localStorage.getItem('userId'))).subscribe(res => {

            this.followingRequestLength = res.list.length;
            this.followingRequestList = res.list;
        });
    }

    /***
     * #1 Get all information about response, if give access to follow
     * */
    getResponseList(page: number, pageSize: number): void {
        const params = 'page=' + page + '&size=' + pageSize;

        this._followingResponseService.findAllByFromUserId(params, parseInt(localStorage.getItem('userId'))).subscribe(res => {

            this.followingResponseLength = res.list.length;
            this.followingResponseList = res.list;
        });
    }

    /***
     * ##2 Accept user to following, add follower
     * */
    acceptFollower(fromUserId: number): void {
        this._followingRequestService.acceptUserToFollow(fromUserId, parseInt(localStorage.getItem('userId'))).subscribe(res => {

            this.removeNotificationInfoToolbar();
            this.acceptNotificationInfoToolbar(fromUserId.toString());

            let iter = 0;
            this.followingRequestList.forEach(loopDelete => {
                if (loopDelete.fromUserId === fromUserId) {
                    this.followingRequestList.splice(iter, 1);
                    this.followingRequestLength = this.followingRequestLength - 1;
                }
                iter++;
            });
        });
    }

    /***
     * ##2 Accept user to following, add follower
     * */
    acceptBecomingTeacherRequest(fromUserId: number): void {
        this._followingRequestService.acceptToBecomeUniversityTeacher(fromUserId, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            this.removeNotificationInfoToolbar();
            this.acceptNotificationInfoToolbar(fromUserId.toString());

            let iter = 0;
            this.followingRequestList.forEach(loopDelete => {
                if (loopDelete.fromUserId === fromUserId) {
                    this.followingRequestList.splice(iter, 1);
                    this.followingRequestLength = this.followingRequestLength - 1;
                }
                iter++;
            });
        });
    }

    /***
     * ##2 Remove access to follow, remove follower from request
     * */
    removeFollower(fromUserId: number): void {
        this._followingRequestService.removeUserToFollow(fromUserId, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            this.removeNotificationInfoToolbar();

            let iter = 0;
            this.followingRequestList.forEach(loopDelete => {
                if (loopDelete.fromUserId === fromUserId) {
                    this.followingRequestList.splice(iter, 1);
                    this.followingRequestLength = this.followingRequestLength - 1;
                }
                iter++;
            });
        });
    }

    /***
     * ##2 Remove message about giving access to following, remove message from response
     * */
    removeResponseMessage(toUserId: number): void {
        this._followingResponseService.deleteResponseMessage(parseInt(localStorage.getItem('userId')), toUserId).subscribe(res => {
            this.removeNotificationInfoToolbar();

            let iter = 0;
            this.followingResponseList.forEach(loopDelete => {
                if (loopDelete.toUserId === toUserId) {
                    this.followingResponseList.splice(iter, 1);
                    this.followingResponseLength = this.followingResponseLength - 1;
                }
                iter++;
            });
        });
    }

    /***
     * #3 Choose type of notification - request
     * */
    chooseRequestNotification(): void {

        if (!this.requestNotificationStat) {
            this.pageScroll = 0;
            this.getRequestList(this.pageScroll, this.pageSizeScroll);
        }

        this.requestNotificationStat = true;
        this.responseNotificationStat = false;
    }

    /***
     * #3 Choose type of notification - response
     * */
    chooseResponseNotification(): void {

        if (!this.responseNotificationStat) {
            this.pageScroll = 0;
            this.getResponseList(this.pageScroll, this.pageSizeScroll);
        }

        this.requestNotificationStat = false;
        this.responseNotificationStat = true;
    }

    /***
     * #4 Add new element by scrolling
     * */
    findMoreDataScrolling(): void {
        if (this.requestNotificationStat) {
            this.pageScroll = this.pageScroll + 1;
            const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

            this._followingResponseService.findAllByToUserId(params, parseInt(localStorage.getItem('userId'))).subscribe(res => {

                res.list.forEach(loopPush => {
                    this.followingRequestList.push(loopPush);
                });
            });

        } else if (this.responseNotificationStat) {
            this.pageScroll = this.pageScroll + 1;
            const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

            this._followingResponseService.findAllByFromUserId(params, parseInt(localStorage.getItem('userId'))).subscribe(res => {
                // this.followingResponseLength = res.list.length;

                res.list.forEach(loopPush => {
                    this.followingResponseList.push(loopPush);
                });
            });
        }
    }

    /********************************************************
     * OPEN SOCKET NOTIFICATION
     * ******************************************************/

    /***
     * ##1 Send to user's toolbar "open socket"
     * */
    acceptNotificationInfoToolbar(toUserId: string): void {
        this.webNotificationSendAccept.fromId = localStorage.getItem('userId');
        this.webNotificationSendAccept.toId = toUserId;

        // ? Send Request
        this.stompClient.send('/socket-information/create/request', {}, JSON.stringify(this.webNotificationSendAccept));
    }

    /***
     * ##1 Send local toolbar
     * */
    removeNotificationInfoToolbar(): void {

        this.webNotificationSend.fromId = localStorage.getItem('userId');
        this.webNotificationSend.toId = localStorage.getItem('userId');

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
