import {
    AfterViewInit,
    Component, EventEmitter,
    Input,
    OnDestroy,
    OnInit, Output,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {WebChattingUserInformationService} from 'app/core/service/web-chatting-user-information-service';
import {UserInformationService} from '../../../../../core/service/user-information-service';
import {TeacherInformationService} from '../../../../../core/service/teacher-information-service';
import {UniversityInformationService} from '../../../../../core/service/university-information-service';
import {UniversityService} from '../../../../../core/service/university-service';
import {WebChattingHistory} from '../../../../../core/models/web-chatting-history';
import {FusePerfectScrollbarDirective} from '../../../../../../@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {FormGroup, NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {environment} from '../../../../../core/models/web-const-environment';
import {Message} from '../../../../../core/models/web-message-object';
import {MatDialog} from '@angular/material/dialog';
import {ChattingDeleteAskComponent} from './chatting-delete-ask/chatting-delete-ask.component';

@Component({
    selector: 'app-view-chatting',
    templateUrl: './view-chatting.component.html',
    styleUrls: ['./view-chatting.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ViewChattingComponent implements OnInit, OnDestroy, AfterViewInit {
    // @ Chatting Information - chatting history
    @Input() chatId: number;
    @Output() arrowBack = new EventEmitter<boolean>();
    @Output() deleteChatNotification = new EventEmitter<number>();
    webChattingHistory: WebChattingHistory[] = [];
    userId: number;

    // @ Chatting Users' information
    chattingWithUserId: number;
    chattingWithUserName: string;
    chattingWithUserImg: string;

    // @ Fuse Chatting Information
    user: any;
    chat: any;
    dialog: any;
    contact: any;
    replyInput: any;

    // @ Socket Message Variable
    serverUrl = environment.url + 'socket';
    isLoaded = false;
    isCustomSocketOpened = false;
    stompClient;
    form: FormGroup;
    messages: Message[] = [];

    // @ Message Body To Send
    messageObject: Message = new Message();

    @ViewChild(FusePerfectScrollbarDirective)
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;

    // @ Page new data for scroll
    pageScroll: number;
    pageSizeScroll: number;
    scrollLoaderStat: boolean;

    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     */
    constructor(
        private _webChattingUserService: WebChattingUserInformationService,
        private _userInformationService: UserInformationService,
        private _teacherInformationService: TeacherInformationService,
        private _universityInformationService: UniversityInformationService,
        private _universityService: UniversityService,
        private _modalService: MatDialog
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.pageScroll = 0;
        this.pageSizeScroll = 100;

        this.userId = parseInt(localStorage.getItem('userId'));
        this.initializeWebSocketConnection();
        this.getChatInfo();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        this.replyInput = this.replyInputField.first.nativeElement;
        this.readyToReply();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    /***
     * #1 Information about chat, for finding users' name and pictures
     * */
    getChatInfo(): void {
        this._webChattingUserService.getChatInfo(this.chatId).subscribe(res => {
            this.scrollLoaderStat = true;

            // @ Information About User
            if (res.fromUserId !== this.userId) {
                this.chattingWithUserId = res.fromUserId;
                this.getUserInfoChattingWith(res.fromUserId);
                this.chattingWithUserImg = '/picture/file/' + res.fromUserId;
                // this.chattingWithUserImg = 'http://localhost:8700/picture/file/' + res.fromUserId;
            } else if (res.toUserId !== this.userId) {
                this.chattingWithUserId = res.toUserId;
                this.getUserInfoChattingWith(res.toUserId);
                this.chattingWithUserImg = '/picture/file/' + res.toUserId;
                // this.chattingWithUserImg = 'http://localhost:8700/picture/file/' + res.toUserId;
            }

            // @ Information about private chat history
            this.getFullChat(0, this.pageSizeScroll);
        });
    }

    /*** #1 Get information about First User
     *
     * */
    getUserInfoChattingWith(chattingWithUserId: number): void {
        // First User Information
        this._userInformationService.findByUserIdFromList(chattingWithUserId).subscribe(userRes => {
            if (userRes.length === 0) {
                this._teacherInformationService.findByUserIdFromList(chattingWithUserId).subscribe(resTeacher => {
                    if (resTeacher.length === 0) {
                        this._universityInformationService.findByUserId(chattingWithUserId).subscribe(resUniversityInfo => {
                            this._universityService.getUniversityById(resUniversityInfo.universityId).subscribe(resUniversityName => {
                                this.chattingWithUserName = resUniversityName.name;
                            });
                        });
                    } else {
                        this._teacherInformationService.findByUserId(chattingWithUserId).subscribe(resTeacherInfo => {
                            this.chattingWithUserName = resTeacherInfo.lastName + ' ' + resTeacherInfo.firstName;
                        });
                    }
                });
            } else {
                this._userInformationService.findByUserId(chattingWithUserId).subscribe(resUserInfo => {
                    this.chattingWithUserName = resUserInfo.lastName + ' ' + resUserInfo.firstName;
                });
            }
        });
    }

    /***
     * #1 Full user's private chatting info
     * */
    getFullChat(page: number, pageSize: number): void {
        this.deleteChatNotification.emit(this.chattingWithUserId);

        const params = 'page=' + page + '&size=' + pageSize;

        this._webChattingUserService.getFullChatting(params, this.chatId, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            this.webChattingHistory = res.list;
            this.scrollLoaderStat = false;

            this.readyToReply();
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /** #1
     * Check if the given message is the first message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isFirstMessageOfGroup(message, i): boolean {
        return (i === 0 || this.webChattingHistory[i - 1] && this.webChattingHistory[i - 1].userId !== message.userId);
    }

    /** #1
     * Check if the given message is the last message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isLastMessageOfGroup(message, i): boolean {
        return (i === this.webChattingHistory.length - 1 || this.webChattingHistory[i + 1] && this.webChattingHistory[i + 1].userId !== message.userId);
    }

    /** #1
     * Ready to reply
     */
    readyToReply(): void {
        setTimeout(() => {
            this.focusReplyInput();
            this.scrollToBottom();
        });
    }

    /** #1
     * Focus to the reply input
     */
    focusReplyInput(): void {
        setTimeout(() => {
            this.replyInput.focus();
        });
    }

    /** #1
     * Scroll to the bottom
     *
     * @param {number} speed
     */
    scrollToBottom(speed?: number): void {
        speed = speed || 400;
        if (this.directiveScroll) {
            this.directiveScroll.update();

            setTimeout(() => {
                this.directiveScroll.scrollToBottom(0, speed);
            });
        }
    }

    /***
     * #2 Back to chat list page
     * */
    backToChatList(): void {
        this.arrowBack.emit();
    }

    /***
     * ##3 Click 2 keyboard button, for add new line to message (shift + enter = new line)
     * Click Enter send message
     * */
    triggerFunction(event): void {
        if (event.shiftKey && event.key === 'Enter') {
            this.replyForm.form.value.message = this.replyForm.form.value.message + '\n';
        } else if (event.key === 'Enter') {
            this.sendMessageUsingSocket();
        }
    }

    /********************************
     * OPEN SOCKET
     * ******************************/

    /***
     * ##3 Send Message method
     * */
    sendMessageUsingSocket(): void {

        if (this.replyForm.form.value.message.trim() === '') {
            return;
        } else {
            this.messageObject.fromId = localStorage.getItem('userId');
            this.messageObject.toId = this.chattingWithUserId.toString();
            this.messageObject.message = this.replyForm.form.value.message;
            this.messageObject.senderUserId = parseInt(localStorage.getItem('userId'));

            // ? Reset the reply form
            this.replyForm.reset();

            // ? Send Message
            this.stompClient.send('/socket-subscriber/send/message', {}, JSON.stringify(this.messageObject));
        }
    }

    /***
     * #3 Socket initialize
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
     * #3 Socket initialize
     * */
    openGlobalSocket(): void {
        this.openSocket();
        this.stompClient.subscribe('/socket-publisher', (message) => {
            this.handleResult(message);
        });
    }

    /***
     * #3 Socket initialize
     * */
    openSocket(): void {
        this.isCustomSocketOpened = true;
        this.stompClient.subscribe('/socket-publisher/' + localStorage.getItem('userId'), (message) => {
            this.handleResult(message);
        });
    }

    /***
     * #3 Socket initialize
     * */
    handleResult(message: any): void {
        const handleChattingHistory: WebChattingHistory = new WebChattingHistory();

        let returnMessage: Message = new Message();
        returnMessage = JSON.parse(message.body);

        handleChattingHistory.messageText = returnMessage.message;
        handleChattingHistory.userId = returnMessage.senderUserId;
        handleChattingHistory.messageSendDate = new Date();

        this.webChattingHistory.push(handleChattingHistory);
        this.readyToReply();
    }

    /***
     * #3 Scrolled to up
     * */
    findMoreDataScrollingUp(): void {
        let webChattingHistoryOld: WebChattingHistory[];
        webChattingHistoryOld = this.webChattingHistory;

        this.pageScroll = this.pageScroll + 1;

        const params = 'page=' + this.pageScroll + '&size=' + 100;

        this._webChattingUserService.getFullChatting(params, this.chatId, parseInt(localStorage.getItem('userId'))).subscribe(res => {
            this.webChattingHistory = res.list;

            webChattingHistoryOld.forEach(loop => {
                this.webChattingHistory.push(loop);
            });
        });
    }

    /***
     * ##4 Delete chat
     * */
    deleteChat(): void {
        this._modalService.open(ChattingDeleteAskComponent, {
            width: '50vh'
        }).updatePosition({top: '10%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this._webChattingUserService.deleteChat(this.chatId, parseInt(localStorage.getItem('userId'))).subscribe(resDelete => {
                });
                this.backToChatList();
            }
        });
    }

}
