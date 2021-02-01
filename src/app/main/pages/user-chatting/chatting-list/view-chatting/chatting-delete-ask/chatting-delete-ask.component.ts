import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-chatting-delete-ask',
    templateUrl: './chatting-delete-ask.component.html',
    styleUrls: ['./chatting-delete-ask.component.scss']
})
export class ChattingDeleteAskComponent implements OnInit {

    constructor(public matDialogRef: MatDialogRef<ChattingDeleteAskComponent>) {
    }

    ngOnInit(): void {
    }

}
