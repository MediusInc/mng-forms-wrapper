import {Component} from '@angular/core';

import {MngCommonsService} from '@mediusinc/mng-commons';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html'
})
export class ErrorPageComponent {
    constructor(public mngCommons: MngCommonsService) {}
}
