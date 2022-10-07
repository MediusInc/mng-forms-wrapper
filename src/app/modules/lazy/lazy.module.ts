import {NgModule} from '@angular/core';

import {AppSharedModule} from '../../app.shared.module';
import {LazyRoutingModule} from './lazy.routing.module';
import {LazyHomePageComponent} from './pages/home/lazy-home-page.component';

@NgModule({
    imports: [AppSharedModule, LazyRoutingModule],
    declarations: [LazyHomePageComponent]
})
export class LazyModule {}
