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
import {NewsPublication} from '../../../../../core/models/news-publication';
import {NewsPublicationService} from '../../../../../core/service/news-publication-service';
import {UserInformationService} from '../../../../../core/service/user-information-service';
import {UniversityInformationService} from '../../../../../core/service/university-information-service';
import {UniversityService} from '../../../../../core/service/university-service';
import {MatDialog} from '@angular/material/dialog';
import {UniversityPublicationEditComponent} from './university-publication-edit/university-publication-edit.component';
import {UniversityPublicationDeleteComponent} from './university-publication-delete/university-publication-delete.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {TeacherInformationService} from '../../../../../core/service/teacher-information-service';

@Component({
    selector: 'app-university-publication-view',
    templateUrl: './university-publication-view.component.html',
    styleUrls: ['./university-publication-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UniversityPublicationViewComponent implements OnInit, OnChanges {
    // @ http route parameter
    @Input() publicationId: number;
    @Output() deletePublicationId = new EventEmitter<number>();

    // @ Information about publication
    publicationObject: NewsPublication = new NewsPublication();
    showFullTextStat: boolean;

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
    @Input() userId: number;
    @Input() changeEngine: string;
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
            if (!changes.changeEngine.firstChange) {
                this.ngOnInit();
            }
        } catch (e) {
        }

        // ? Try to find changing in userId
        try {
            if (!changes.userId.firstChange) {
                this.ngOnInit();
            }
        } catch (e) {
        }
    }

    ngOnInit(): void {
        this.showFullTextStat = false;
        this.getPublicationById();
        // this.publicationImgSrc = 'http://78.140.223.4:8700/publication-control/publication/picture/';
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
            this.profilePhoto = '/picture/file/' + res.userId;
            // this.profilePhoto = 'http://localhost:8700/picture/file/' + res.userId;

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

    /***
     * ##2 Edit publication
     * */
    editPublication(): void {
        this._modalService.open(UniversityPublicationEditComponent, {
            data: {
                pictureUrl: this.publicationObject.pictureUrl,
                publicationId: this.publicationId
            },
            maxWidth: '65vh !important',
            maxHeight: '80vh',
            width: '55vh',
            height: '50vh'
        }).updatePosition({top: '5%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this.changePicture = (new Date()).getTime();
                this.ngOnInit();
            }
        });
    }

    /***
     * ##2 Delete publication
     * */
    deletePublication(): void {
        this._modalService.open(UniversityPublicationDeleteComponent, {
            data: {
                publicationId: this.publicationId
            },
            maxWidth: '65vh !important',
            width: '60vh',
            // height: '20vh'
        }).updatePosition({top: '10%'})
            .afterClosed().subscribe(res => {
            if (res) {
                this.deletePublicationId.emit(this.publicationId);
            }
        });
    }

    showAllText(): void {
        this.showFullTextStat = true;
    }

}
