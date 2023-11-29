import {AfterViewInit, Component} from '@angular/core';

import {first, fromEvent} from 'rxjs';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements AfterViewInit {
    private readonly formsAuthIframeCheckIntervalExecMax = 50;
    private readonly formsAuthIframeId = 'formsAuthIframe';
    private readonly formsAuthIframeSrc = '/forms/forms-ping'; // this one should be configurable
    private formsAuthIframeCheckInterval?: number;
    private formsAuthIframeCheckIntervalExecCnt = 0;
    private formsAuthIframeEl?: HTMLIFrameElement;

    ngAfterViewInit(): void {
        this.findOrCreateFormsAuthIframe();
    }

    /**
     * Finds auth iframe. If not found, new is created and appended to body.
     * @private
     */
    private findOrCreateFormsAuthIframe() {
        this.formsAuthIframeEl = document.querySelector(`iframe#${this.formsAuthIframeId}`) ?? undefined;
        if (!this.formsAuthIframeEl) {
            // no iframe found, create new one
            this.formsAuthIframeEl = document.createElement('iframe');
            this.formsAuthIframeEl.src = this.formsAuthIframeSrc;
            this.formsAuthIframeEl.setAttribute('id', this.formsAuthIframeId);

            // should not be visible
            this.formsAuthIframeEl.setAttribute('width', '0');
            this.formsAuthIframeEl.setAttribute('height', '0');
            this.formsAuthIframeEl.setAttribute('frameborder', '0');
            this.formsAuthIframeEl.setAttribute('style', 'position: absolute; width: 0px; height: 0px; border: none; left: -1000px; top: -1000px;');
            this.formsAuthIframeEl.setAttribute('sandbox', 'allow-same-origin');

            fromEvent(this.formsAuthIframeEl, 'load')
                .pipe(first())
                .subscribe(() => {
                    // listen to load event and start checking content
                    console.debug('Forms Auth iFrame loaded, checking auth.');
                    this.checkFormsAuthIframeContent();
                });

            // append to body
            document.body.appendChild(this.formsAuthIframeEl);

            console.debug('Forms Auth iFrame created.');
        } else {
            // start checking content
            this.checkFormsAuthIframeContent();
        }
    }

    /**
     * Periodically checks for forms auth iframe by checking content. If content is correct, then vaadin app is started.
     * @private
     */
    private checkFormsAuthIframeContent() {
        this.stopFormsAuthCheckInterval();
        this.formsAuthIframeCheckInterval = window.setInterval(() => {
            this.formsAuthIframeCheckIntervalExecCnt++;
            console.debug(`Executing ${this.formsAuthIframeCheckIntervalExecCnt}/${this.formsAuthIframeCheckIntervalExecMax} iFrame auth checks`, new Date().getTime());

            try {
                if (!this.formsAuthIframeEl) {
                    // no forms auth iframe element exists, stop checking
                    console.warn('Forms Auth iFrame not present');
                    this.stopFormsAuthCheckInterval();
                    return;
                }

                let isAuthFinished = false;

                // uncomment for testing purposes:
                // throw new Error('Blocked a frame with origin "..." from accessing a cross-origin frame.');

                if (!this.formsAuthIframeEl.contentWindow?.document) {
                    // document possibly not yet available, log it, try again later
                    console.debug('Auth iFrame contentWindow document not defined', this.formsAuthIframeEl.contentWindow?.document);
                } else {
                    isAuthFinished = (this.formsAuthIframeEl.contentWindow.document.body?.innerText?.toLowerCase()?.indexOf('pong') ?? -1) >= 0;

                    console.debug(`Auth iFrame contentWindow document is present with body inner text`, this.formsAuthIframeEl.contentWindow.document.body?.innerText);
                }

                if (isAuthFinished) {
                    // if right content is found init the vaadin app and stop timer
                    this.stopFormsAuthCheckInterval();
                    this.initVaadinApplication();
                }
            } catch (e) {
                // some kind of error occurred while trying to scan iframe content, log it
                console.warn('Cannot access iframe content, continue trying', e);
            }

            if (this.formsAuthIframeCheckIntervalExecCnt > this.formsAuthIframeCheckIntervalExecMax) {
                // number of max executions is passed, stop trying
                this.stopFormsAuthCheckInterval();
            }
        }, 100);
    }

    /**
     * Stop interval for forms auth check and reset counters/timers.
     * @private
     */
    private stopFormsAuthCheckInterval() {
        window.clearInterval(this.formsAuthIframeCheckInterval);
        this.formsAuthIframeCheckInterval = undefined;
        this.formsAuthIframeCheckIntervalExecCnt = 0;
    }

    /**
     * Start Vaadin app.
     * @private
     */
    private initVaadinApplication() {
        console.debug('initing vaadin application');
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
