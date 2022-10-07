import {Component} from '@angular/core';

import {MngCommonsService} from '@mediusinc/mng-commons';

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html'
})
export class NotFoundPageComponent {
    constructor(public mngCommons: MngCommonsService) {}
}
