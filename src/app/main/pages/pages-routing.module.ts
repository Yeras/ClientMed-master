import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../../core/guards/auth.guard';
import {PagesComponent} from './pages.component';

export const LayoutRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: PagesComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: './home/home.module#HomeModule'
            },
            {
                path: 'doc-appointment',
                loadChildren: './doctor-appointment/doctor-appointment.module#DoctorAppointmentModule'
            },


            {
                path: 'user-information/:userId',
                loadChildren: './user-information/user-information.module#UserInformationModule'
            },
            {
                path: 'user-settings',
                loadChildren: './user-forgot-password/user-forgot-password.module#UserForgotPasswordModule'
            },
            {
                path: 'universities-view',
                loadChildren: './universities-view/universities-view.module#UniversitiesViewModule'
            },
            {
                path: 'adm-university',
                loadChildren: './adm-university/adm-university.module#AdmUniversityModule'
            },
            {
                path: 'adm-teacher',
                loadChildren: './adm-teacher/adm-teacher.module#AdmTeacherModule'
            },
            {
                path: 'adm-achievement',
                loadChildren: './adm-achievement/adm-achievement.module#AdmAchievementModule'
            },
            {
                path: 'user-notification/:userId',
                loadChildren: './user-notification/user-notification.module#UserNotificationModule'
            },
            {
                path: 'chatting/:userId',
                loadChildren: './user-chatting/user-chatting.module#UserChattingModule'
            },
            {
                path: 'university-teachers/:universityId',
                loadChildren: './university-teachers/university-teachers.module#UniversityTeachersModule'
            },
            {
                path: 'user-followers-full/:userId',
                loadChildren: './user-followers-full/user-followers-full.module#UserFollowersFullModule'
            },
            {
                path: 'user-following-full/:userId',
                loadChildren: './user-following-full/user-following-full.module#UserFollowingFullModule'
            },
            {
                path: 'think-about/:teacherId',
                loadChildren: './user-think-about-teacher/user-think-about-teacher.module#UserThinkAboutTeacherModule'
            },
            {
                path: 'publication/:publicationId/:userId',
                loadChildren: './user-publication-one-page/user-publication-one-page.module#UserPublicationOnePageModule'
            },
            {
                path: '404',
                loadChildren: './adm-not-found/adm-not-found.module#AdmNotFoundModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(LayoutRoutes)],
    exports: [RouterModule]
})

export class PagesRoutingModule {

}