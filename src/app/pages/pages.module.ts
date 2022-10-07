import {NgModule} from '@angular/core';

import {AppSharedModule} from '../app.shared.module';
import {ErrorPageComponent} from './error/error-page.component';
import {HomePageComponent} from './home/home-page.component';
import {NotFoundPageComponent} from './not-found/not-found-page.component';

const components = [HomePageComponent, NotFoundPageComponent, ErrorPageComponent];

@NgModule({
    imports: [AppSharedModule],
    declarations: [...components],
    exports: [...components]
})
export class PagesModule {}
