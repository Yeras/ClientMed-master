import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SocketService} from '../../../core/service/web-chatting-service';
import {fuseAnimations} from '../../../../@fuse/animations';

@Component({
    selector: 'app-user-chatting',
    templateUrl: './user-chatting.component.html',
    styleUrls: ['./user-chatting.component.scss'],
    providers: [SocketService],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserChattingComponent implements OnInit {
    userId: number;

    ngOnInit(): void {
        this.userId = parseInt(localStorage.getItem('userId'));
    }

}
