import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {WebChattingUserInformationService} from '../../../../core/service/web-chatting-user-information-service';
import {WebUserChatInformationList} from '../../../../core/models/web-user-chat-information-list';
import {environment} from '../../../../core/models/web-const-environment';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {environmentChatToolbar} from '../../../../core/constant/web-const-chat-toolbar-path';
import {Message} from '../../../../core/models/web-message-object';

@Component({
    selector: 'app-chatting-list',
    templateUrl: './chatting-list.component.html',
    styleUrls: ['./chatting-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChattingListComponent implements OnInit {
    // @ Main User information
    @Input() userId: number;
    webUserChatInformationList: WebUserChatInformationList[] = [];
    localUser: number;

    // @ Socket information
    serverUrl = environment.url + 'socket';
    isLoaded = false;
    isCustomSocketOpened = false;
    stompClient;

    // @ Socket information about deleting opened chat notification
    serverUrlDelete = environmentChatToolbar.url + 'socket';
    isLoadedDelete = false;
    isCustomSocketOpenedDelete = false;
    stompClientDelete;

    // @ Chat Information
    chatId: number;
    openChatStat: boolean;
    chatList: number;

    // @ Page new data for scroll
    pageScroll: number;
    pageSizeScroll: number;

    constructor(private _webChattingUserService: WebChattingUserInformationService) {
    }

    ngOnInit(): void {
        this.pageScroll = 0;
        this.pageSizeScroll = 12;

        this.localUser = parseInt(localStorage.getItem('userId'));
        this.findUserChatList(this.pageScroll, this.pageSizeScroll);

        /***
         * Open socket
         * */
        this.initializeWebSocketConnection();
        this.initializeWebSocketConnectionDeleteChatNotification();
    }


    /***
     *****************************************************************
     * Open Socket for chatting
     *****************************************************************
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
     *****************************************************************
     * Open Socket for chatting
     *****************************************************************
     * */
    openGlobalSocket(): void {
        this.openSocket();
        this.stompClient.subscribe('/socket-publisher', (message) => {
            this.findUserChatList(this.pageScroll, this.pageSizeScroll);
            // this.handleResult(message);
        });
    }

    /***
     *****************************************************************
     * Open Socket for chatting
     *****************************************************************
     * */
    openSocket(): void {
        this.isCustomSocketOpened = true;
        this.stompClient.subscribe('/socket-publisher/' + localStorage.getItem('userId'), (message) => {
            this.pageScroll = 0;
            this.findUserChatList(this.pageScroll, this.pageSizeScroll);
        });
    }

    /***
     * #1 Get all user's chat
     * */
    findUserChatList(page: number, pageSize: number): void {
        const params = 'page=' + page + '&size=' + pageSize;

        this._webChattingUserService.getAllChat(params, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            this.webUserChatInformationList = res.list;
            this.chatList = res.list.length;
        });
    }

    /***
     * #2 Add new element by scrolling
     * */
    findMoreDataScrolling(): void {

        this.pageScroll = this.pageScroll + 1;
        const params = 'page=' + this.pageScroll + '&size=' + this.pageSizeScroll;

        this._webChattingUserService.getAllChat(params, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            res.list.forEach(loopPush => {
                this.webUserChatInformationList.push(loopPush);
            });
        });
    }

    /***
     * #2 Open chat for chatting and chat information
     * */
    openChat(chatId: number): void {

        if (this.chatId !== chatId) {
            this.openChatStat = false;

            this.chatId = chatId;
            setTimeout(() => {
                this.openChatStat = true;
            }, 100);
        }
    }

    /***
     * #3 Come Back To Chat List
     * */
    openChatListAgain(): void {
        this.pageScroll = 0;
        this.openChatStat = false;
        this.findUserChatList(this.pageScroll, this.pageSizeScroll);
    }

    /****************************************************
     * OPEN SOCKET FOR TOOLBAR
     * **************************************************/

    /***
     * #3 Socket initialize for deleting opened chat notification
     * */
    initializeWebSocketConnectionDeleteChatNotification(): void {
        const ws = new SockJS(this.serverUrlDelete);
        this.stompClientDelete = Stomp.over(ws);
        const that = this;
        this.stompClientDelete.connect({}, function (frame) {
            that.isLoadedDelete = true;
            that.openGlobalSocketDeleteChatNotification();
        });
    }

    /***
     * #3 Socket initialize for deleting opened chat notification
     * */
    openGlobalSocketDeleteChatNotification(): void {
        this.openSocketDeleteChatNotification();
        this.stompClientDelete.subscribe('/socket-chat', (message) => {
            // this.handleResultDeleteChatNotification(message);
        });
    }

    /***
     * #3 Socket initialize for deleting opened chat notification
     * */
    openSocketDeleteChatNotification(): void {
        this.isCustomSocketOpenedDelete = true;
        this.stompClientDelete.subscribe('/socket-chat/' + localStorage.getItem('userId'), (message) => {
        });
    }

    /***
     * #3 Call toolbar for deleting opened chat notification
     * */
    sendMessageUsingSocketToToolbar(event: any): void {
        // @ Message
        const messageObjectDelete: Message = new Message();

        messageObjectDelete.fromId = event.toString();
        messageObjectDelete.toId = localStorage.getItem('userId');

        this.stompClientDelete.send('/socket-toolbar/notification/message', {}, JSON.stringify(messageObjectDelete));
    }

}
