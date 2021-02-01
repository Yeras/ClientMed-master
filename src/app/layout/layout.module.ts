import {NgModule} from '@angular/core';
import {VerticalLayout3Module} from 'app/layout/vertical/layout-3/layout-3.module';
import {HorizontalLayout1Module} from 'app/layout/horizontal/layout-1/layout-1.module';

@NgModule({
    imports: [
        VerticalLayout3Module,
        HorizontalLayout1Module
    ],
    exports: [
        VerticalLayout3Module,
        HorizontalLayout1Module
    ]
})
export class LayoutModule {
}
