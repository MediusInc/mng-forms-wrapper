import {NgModule} from '@angular/core';

import {sharedAngularModules, thirdPartyModules} from '../app.shared.modules';

// TODO: add components in next line and uncomment
// const components = [];

@NgModule({
    imports: [...sharedAngularModules, thirdPartyModules]
    // TODO: when components are added, uncommnet next 2 lines
    // declarations: [...components],
    // exports: [...components]
})
export class AppCoreModule {}
