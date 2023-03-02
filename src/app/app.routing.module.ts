import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {RouteBuilder, RoutesBuilder} from '@mediusinc/mng-commons';

import {routesBuilder as lazyRoutesBuilder} from './modules/lazy/lazy.routing.module';
import {ErrorPageComponent} from './pages/error/error-page.component';
import {HomePageComponent} from './pages/home/home-page.component';
import {NotFoundPageComponent} from './pages/not-found/not-found-page.component';
import {RedirectPageComponent} from './pages/redirect/redirect.page.component';

export const routesBuilder: RoutesBuilder = RoutesBuilder.create()
    .addRouteBuilder(
        RouteBuilder.createLayoutRoute('')
            .addChildBuilder(RouteBuilder.createRedirect('', 'home', 'full'))
            .addChildBuilder(RouteBuilder.create('home', HomePageComponent).withTitle('pages.home.title').withMenuItem('pi pi-home'))
            .addChildBuilder(
                RouteBuilder.createLazyRoute('lazy', () => import('./modules/lazy/lazy.module').then(m => m.LazyModule))
                    .withMenuItem('pi pi-fw pi-list', 'pages.lazy.title')
                    .withMenuItemChildren(lazyRoutesBuilder)
            )
    )
    .addRouteBuilder(RouteBuilder.create('error', ErrorPageComponent))
    .addRouteBuilder(RouteBuilder.create('redirect', RedirectPageComponent))
    .addRouteBuilder(RouteBuilder.create('not-found', NotFoundPageComponent))
    .addRouteRedirect('**', '/not-found');

@NgModule({
    imports: [
        RouterModule.forRoot(routesBuilder.buildRoutes(), {
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
