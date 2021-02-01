import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {SocketService} from '../../../../core/service/web-chatting-service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../../../core/models/web-message-object';
import {environment} from '../../../../core/models/web-const-environment';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
    selector: 'app-write-message',
    templateUrl: './write-message.component.html',
    styleUrls: ['./write-message.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class WriteMessageComponent implements OnInit {
    // @ Router param value
    toUserId: number;

    // @ Message
    messageObject: Message = new Message();

    // @ Socket Message Variable
    serverUrl = environment.url + 'socket';
    isLoaded = false;
    isCustomSocketOpened = false;
    stompClient;
    form: FormGroup;
    userForm: FormGroup;
    messages: Message[] = [];

    constructor(public activeModal: MatDialogRef<WriteMessageComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private socketService: SocketService,
                private toastr: ToastrService) {
        this.toUserId = _data.toUserId;
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            message: new FormControl(null, [Validators.required])
        });
        this.userForm = new FormGroup({
            fromId: new FormControl(null, [Validators.required]),
            toId: new FormControl(null)
        });
        this.initializeWebSocketConnection();
    }


    /******************************************************
     * OPEN SOCKET
     * ****************************************************/

    /***
     * #1 Send Message
     * */
    sendMessageUsingSocket(): void {
        this.messageObject.fromId = localStorage.getItem('userId');
        this.messageObject.toId = this.toUserId.toString();

        this.stompClient.send('/socket-subscriber/create/message', {}, JSON.stringify(this.messageObject));

        this.activeModal.close();
    }

    initializeWebSocketConnection(): void {
        const ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        const that = this;
        this.stompClient.connect({}, function (frame) {
            that.isLoaded = true;
            that.openGlobalSocket();
        });
    }

    openGlobalSocket(): void {
        this.openSocket();
        this.stompClient.subscribe('/socket-publisher', (message) => {
        });
    }

    openSocket(): void {
        this.isCustomSocketOpened = true;
        this.stompClient.subscribe('/socket-publisher/' + localStorage.getItem('userId'), (message) => {
        });
    }

}
