import {AfterViewInit, Component} from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        const vaadin = window['vaadin' as keyof object] as any;
        vaadin.initApplication("forms", {
            "browserDetailsUrl": "forms/app?embedded=true",
            "serviceUrl": "/forms/app",
            "widgetset": "com.vaadin.DefaultWidgetSet",
            "theme": "valo-littea-tip",
            "versionInfo": {"vaadinVersion": "7.7.17"},
            "vaadinDir": "forms/VAADIN/",
            "heartbeatInterval": 15,
            "debug": false,
            "standalone": false,
            "authErrMsg": {
                "message": "Zapišite si vse neshranjene podatke " +
                    "za nadaljevanje <u>kliknite tukaj<\/u>.",
                "caption": "Napaka pri avtentikaciji"
            },
            "comErrMsg": {
                "message": "Zapišite si vse neshranjene podatke " +
                    "za nadaljevanje <u>kliknite tukaj<\/u>.",
                "caption": "Napaka pri povezavi"
            },
            "sessExpMsg": {
                "message": "Zapišite si vse neshranjene podatke " +
                    "za nadaljevanje <u>kliknite tukaj<\/u>.",
                "caption": "Seja je potekla"
            }
        });
    }
}
