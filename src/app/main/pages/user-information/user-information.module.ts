import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserInformationComponent} from './user-information.component';
import {UserInformationRoutingModule} from './user-information-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {UserInformationPictureComponent} from './user-view-information/user-information-picture/user-information-picture.component';
import {UserViewInformationComponent} from './user-view-information/user-view-information.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {UserViewEducationDeleteComponent} from './user-view-information/user-view-education-delete/user-view-education-delete.component';
import {UserViewEducationInfoComponent} from './user-view-information/user-view-education-info/user-view-education-info.component';
import {UniversityViewInformationComponent} from './university-view-information/university-view-information.component';
import {UniversityPublicationViewListComponent} from './university-publication-view-list/university-publication-view-list.component';
import {UniversityPublicationCreateComponent} from './university-publication-view-list/university-publication-create/university-publication-create.component';
import {UniversityFollowersViewComponent} from './university-view-information/university-followers-view/university-followers-view.component';
import {UniversityTeachersViewComponent} from './university-view-information/university-teachers-view/university-teachers-view.component';
import {UniversityPublicationEditComponent} from './university-publication-view-list/university-publication-view/university-publication-edit/university-publication-edit.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {UniversityPublicationDeleteComponent} from './university-publication-view-list/university-publication-view/university-publication-delete/university-publication-delete.component';
import {UniversityPublicationViewComponent} from './university-publication-view-list/university-publication-view/university-publication-view.component';
import {CommentPublicationViewListComponent} from './comment-publication-view-list/comment-publication-view-list.component';
import {CommentPublicationReplyComponent} from './comment-publication-view-list/comment-view/comment-publication-reply/comment-publication-reply.component';
import {CommentViewComponent} from './comment-publication-view-list/comment-view/comment-view.component';
import {PublicationLikeDislikeComponent} from './publication-like-dislike/publication-like-dislike.component';
import {UnfollowRemoveUserModalComponent} from './unfollow-remove-user-modal/unfollow-remove-user-modal.component';
import {TeacherViewInformationComponent} from './teacher-view-information/teacher-view-information.component';
import {FollowingListComponent} from './following-list/following-list.component';
import {FollowerListComponent} from './follower-list/follower-list.component';
import {WriteMessageComponent} from './write-message/write-message.component';
import {SocketService} from '../../../core/service/web-chatting-service';
import {UniversityRatingComponent} from './university-view-information/university-rating/university-rating.component';
import {RatingInformationComponent} from './university-view-information/university-rating/rating-information/rating-information.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FuseConfirmDialogModule, FuseSidebarModule, FuseWidgetModule} from '../../../../@fuse/components';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TranslateModule} from '@ngx-translate/core';
import {NgxSpinnerModule} from 'ngx-spinner';
import {RatingChooseComponent} from './university-view-information/university-rating/rating-choose/rating-choose.component';
import {RatingReadyComponent} from './university-view-information/university-rating/rating-choose/rating-ready/rating-ready.component';
import {TeacherRatingComponent} from './teacher-view-information/teacher-rating/teacher-rating.component';
import {TeacherRatingChooseComponent} from './teacher-view-information/teacher-rating/teacher-rating-choose/teacher-rating-choose.component';
import {TeacherRatingInformationComponent} from './teacher-view-information/teacher-rating/teacher-rating-information/teacher-rating-information.component';
import {TeacherWorkHistoryComponent} from './teacher-view-information/teacher-work-history/teacher-work-history.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {TeacherAchievementComponent} from './teacher-view-information/teacher-achievement/teacher-achievement.component';
import {AchievementViewEditComponent} from './teacher-view-information/teacher-achievement/achievement-view-edit/achievement-view-edit.component';
import {TrimPipe} from '../../../core/pipes/TrimPipe';
import {ToolbarModule} from '../../../layout/components/toolbar/toolbar.module';

@NgModule({
    declarations: [UserInformationComponent, UserInformationPictureComponent, UserViewInformationComponent, UserViewEducationDeleteComponent,
        UserViewEducationInfoComponent, UniversityViewInformationComponent, UniversityPublicationViewListComponent, UniversityPublicationCreateComponent,
        UniversityFollowersViewComponent, UniversityTeachersViewComponent, UniversityPublicationEditComponent, UniversityPublicationDeleteComponent,
        UniversityPublicationViewComponent, CommentPublicationViewListComponent, CommentPublicationReplyComponent, CommentViewComponent,
        PublicationLikeDislikeComponent, UnfollowRemoveUserModalComponent, TeacherViewInformationComponent, FollowingListComponent, FollowerListComponent,
        WriteMessageComponent, UniversityRatingComponent, RatingInformationComponent, RatingChooseComponent, RatingReadyComponent, TeacherRatingComponent,
        TeacherRatingChooseComponent, TeacherRatingInformationComponent, TeacherWorkHistoryComponent, TeacherAchievementComponent, AchievementViewEditComponent,
        TrimPipe],

    imports: [
        CommonModule,
        UserInformationRoutingModule,

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatMenuModule,
        MatToolbarModule,

        FuseSharedModule,

        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatNativeDateModule,

        NgbModule,
        MatCheckboxModule,
        MatRippleModule,
        MatTableModule,
        MatPaginatorModule,

        FuseConfirmDialogModule,
        FuseSidebarModule,

        NgxChartsModule,
        FuseWidgetModule,
        TranslateModule,
        NgxSpinnerModule,
        InfiniteScrollModule,
        ToolbarModule
    ],
    exports: [
        UniversityPublicationViewComponent,
        TrimPipe,
        PublicationLikeDislikeComponent,
        CommentPublicationViewListComponent
    ],
    entryComponents: [UserInformationPictureComponent, UserViewEducationDeleteComponent,
        UniversityPublicationCreateComponent, UniversityPublicationEditComponent, UniversityPublicationDeleteComponent,
        UnfollowRemoveUserModalComponent, WriteMessageComponent, UniversityRatingComponent, RatingReadyComponent,
        TeacherAchievementComponent],
    providers: [SocketService]
})
export class UserInformationModule {

}
