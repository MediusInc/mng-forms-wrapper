import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-redirect-page',
    templateUrl: './redirect.page.component.html'
})
export class RedirectPageComponent implements OnInit {
    ngOnInit() {
        location.href = `${location.protocol}//${location.host}/not-found`
    }
}
