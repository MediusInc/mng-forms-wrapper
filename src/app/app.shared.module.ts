import {NgModule} from '@angular/core';

import {AppCoreModule} from '@core/app.core.module';

import {sharedAngularModules, thirdPartyModules} from './app.shared.modules';

const modules = [...sharedAngularModules, ...thirdPartyModules, AppCoreModule];

@NgModule({
    imports: [modules],
    exports: [modules]
})
export class AppSharedModule {}
