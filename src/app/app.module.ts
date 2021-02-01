import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {PagesModule} from './main/pages/pages.module';
import {ErrorHandlerService} from './core/services/error-handler.service';
import {GestureConfig} from '@angular/material/core';
import {Interceptor} from './core/services/intercepter.service';
import {AuthenticationModule} from './main/authentication/authentication.module';
import {AuthGuard} from './core/guards/auth.guard';
import {NoAuthGuard} from './core/guards/no-auth.guard';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {FormsModule} from '@angular/forms';
import {HomeModule} from './main/pages/home/home.module';
import {UserInformationModule} from './main/pages/user-information/user-information.module';
import {UniversitiesViewModule} from './main/pages/universities-view/universities-view.module';
import {AdmUniversityModule} from './main/pages/adm-university/adm-university.module';
import {AdmTeacherModule} from './main/pages/adm-teacher/adm-teacher.module';
import {UserNotificationModule} from './main/pages/user-notification/user-notification.module';
import {UserChattingModule} from './main/pages/user-chatting/user-chatting.module';
import {ToastrModule} from 'ngx-toastr';
import {SocketService} from './core/service/web-chatting-service';
import {UniversityTeachersModule} from './main/pages/university-teachers/university-teachers.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {UserFollowersFullModule} from './main/pages/user-followers-full/user-followers-full.module';
import {UserFollowingFullModule} from './main/pages/user-following-full/user-following-full.module';
import {AdmAchievementModule} from './main/pages/adm-achievement/adm-achievement.module';
import {UserThinkAboutTeacherModule} from './main/pages/user-think-about-teacher/user-think-about-teacher.module';
import {UserForgotPasswordModule} from './main/pages/user-forgot-password/user-forgot-password.module';
import {AdmNotFoundModule} from './main/pages/adm-not-found/adm-not-found.module';
import {UserPublicationOnePageModule} from './main/pages/user-publication-one-page/user-publication-one-page.module';
import {DoctorAppointmentModule} from './main/pages/doctor-appointment/doctor-appointment.module';

const appRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: './main/pages/pages.module#PagesModule'

    },
    {
        path: 'auth',
        canActivate: [NoAuthGuard],
        loadChildren: './main/authenticationModule/authenticationModule.module#AuthenticationModule'
    }
];
const appOptions: ExtraOptions = {
    useHash: true
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, appOptions),
        FormsModule,
        InfiniteScrollModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        HomeModule,
        DoctorAppointmentModule,

        UserInformationModule,
        UserForgotPasswordModule,
        UniversitiesViewModule,
        AdmUniversityModule,
        AdmTeacherModule,
        AdmAchievementModule,
        UserNotificationModule,
        UserChattingModule,
        UniversityTeachersModule,
        UserFollowersFullModule,
        UserFollowingFullModule,
        UserThinkAboutTeacherModule,
        UserPublicationOnePageModule,
        AdmNotFoundModule,


        LayoutModule,
        AuthenticationModule,
        PagesModule,
        TranslateModule,
        MonacoEditorModule.forRoot(),
        ToastrModule.forRoot({timeOut: 3000}),
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        {provide: ErrorHandler, useClass: ErrorHandlerService},
        {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
        {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
        SocketService
    ],
})
export class AppModule {
}

// platformBrowserDynamic().bootstrapModule(AppModule);
