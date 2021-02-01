import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {NewsPublication} from '../../../../../core/models/news-publication';
import {NewsPublicationService} from '../../../../../core/service/news-publication-service';
import {UserInformationService} from '../../../../../core/service/user-information-service';
import {TeacherInformationService} from '../../../../../core/service/teacher-information-service';
import {UniversityInformationService} from '../../../../../core/service/university-information-service';
import {UniversityService} from '../../../../../core/service/university-service';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-one-page-view',
    templateUrl: './one-page-view.component.html',
    styleUrls: ['./one-page-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OnePageViewComponent implements OnInit, OnChanges {
    // @ http route parameter
    @Input() publicationId: number;
    @Input() userId: number;
    @Output() deletePublicationId = new EventEmitter<number>();

    // @ Information about publication
    publicationObject: NewsPublication = new NewsPublication();

    // @ Profile picture
    profilePhoto: string;

    // @ Information about user publication
    publicationImgSrc: string;
    changePicture: any;

    // @ View Stat changing
    myProfileStat: boolean;

    //
    //
    //
    //
    //
    @Input() changeEngine: string;
    //
    //
    //
    //
    //

    constructor(private _newsPublicationService: NewsPublicationService,
                private _userInformationService: UserInformationService,
                private _teacherInformationService: TeacherInformationService,
                private _universityInformationService: UniversityInformationService,
                private _universityService: UniversityService,
                private _modalService: MatDialog) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // ? Try to find changing in engine
        try {
            if (!changes.publicationId.firstChange || !changes.userId.firstChange) {
                this.ngOnInit();
            }
        } catch (e) {
            try {
                if (!changes.publicationId.firstChange) {
                    this.ngOnInit();
                }
            } catch (e) {
            }
            try {
                if (!changes.userId.firstChange) {
                    this.ngOnInit();
                }
            } catch (e) {
            }
        }
    }

    ngOnInit(): void {
        this.getPublicationById();
        this.publicationImgSrc = '/publication-control/publication/picture/';
        // this.publicationImgSrc = 'http://localhost:8700/publication-control/publication/picture/';
    }


    /***
     * #1 Publication information
     * */
    getPublicationById(): void {
        this._newsPublicationService.editById(this.publicationId).subscribe(res => {
            this.publicationObject = res;

            this.changePicture = (new Date()).getTime();

            if (res.userId.toString() === localStorage.getItem('userId')) {
                this.myProfileStat = true;
            } else {
                this.myProfileStat = false;
            }

            this.findUserName();
            this.findPicture();
        });
    }

    /***
     * #1 Find User Name and find type of user
     * */
    findUserName(): void {
        console.log('USER ID: ', this.publicationObject.userId);
        // @ User group - university
        this._universityInformationService.findByUserIdFromList(this.publicationObject.userId).subscribe(resUniversityList => {
            if (resUniversityList.length === 0) {
                // @ User group - teacher
                this._teacherInformationService.findByUserIdFromList(this.publicationObject.userId).subscribe(res => {
                    if (res.length === 0) {
                        // @ User group - user
                        this._userInformationService.findByUserId(this.publicationObject.userId).subscribe(resUser => {
                            this.publicationObject.userName = resUser.lastName + ' ' + resUser.firstName;
                        });
                    } else {
                        this._teacherInformationService.findByUserId(this.publicationObject.userId).subscribe(resTeacher => {
                            this.publicationObject.userName = resTeacher.lastName + ' ' + resTeacher.firstName;
                        });
                    }
                });
            } else {
                this._universityInformationService.findByUserId(this.publicationObject.userId).subscribe(resUniversity => {
                    this._universityService.getUniversityById(resUniversity.universityId).subscribe(resUniversityName => {
                        this.publicationObject.userName = resUniversityName.name;
                    });
                });
            }
        });
    }

    /***
     * #1 Publication picture
     * */
    findPicture(): void {
        this._newsPublicationService.findPicture(this.publicationId).subscribe(res => {
            if (res !== null) {
                this.publicationObject.pictureUrl = res.type;
            }
        });
    }

}
