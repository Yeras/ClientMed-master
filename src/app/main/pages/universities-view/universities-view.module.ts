import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UniversitiesViewComponent} from './universities-view.component';
import {UniversitiesViewRoutingModule} from './universities-view-routing.module';
import {UniversityListComponent} from './university-list/university-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseSidebarModule} from '../../../../@fuse/components';
import {UniversityListInfoComponent} from '../adm-university/adm-university-list/university-list-info/university-list-info.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ToolbarModule} from '../../../layout/components/toolbar/toolbar.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [UniversitiesViewComponent, UniversityListComponent, UniversityListInfoComponent],
    exports: [
        UniversityListInfoComponent
    ],
    imports: [
        CommonModule,
        UniversitiesViewRoutingModule,

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,

        FuseSharedModule,
        FuseSidebarModule,
        InfiniteScrollModule,
        ToolbarModule,

        TranslateModule
    ]
})
export class UniversitiesViewModule {
}
