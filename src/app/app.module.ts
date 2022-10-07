import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {environment} from '@environment';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';

import {MngCommonsModule} from '@mediusinc/mng-commons';

import {AppCoreModule} from '@core/app.core.module';

import {AppComponent} from './app.component';
import {AppRoutingModule, routesBuilder} from './app.routing.module';
import {PagesModule} from './pages/pages.module';

export function i18nHttpLoaderFactory(http: HttpClient) {
    return new MultiTranslateHttpLoader(http, [
        {prefix: './assets/i18n/mng/', suffix: '.json'},
        {prefix: './assets/i18n/', suffix: '.json'}
    ]);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: i18nHttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MngCommonsModule.forRoot({
            app: {
                logoPathDark: 'assets/images/logo-symbol.svg',
                logoNamePathDark: 'assets/images/logo-text.svg',
                languages: ['en', 'sl']
            },
            menu: {
                mode: 'sidebar',
                menuItems: routesBuilder.buildMenu(),
                pinEnabled: true
            },
            configuration: {
                projectEnvironment: environment
            }
        }),

        AppRoutingModule,
        AppCoreModule,
        PagesModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
