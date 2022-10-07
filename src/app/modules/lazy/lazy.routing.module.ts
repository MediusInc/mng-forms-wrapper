import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {RouteBuilder, RoutesBuilder} from '@mediusinc/mng-commons';

import {LazyHomePageComponent} from './pages/home/lazy-home-page.component';

export const routesBuilder = RoutesBuilder.create()
    .addRouteRedirect('', 'home', 'full')
    .addRouteBuilder(RouteBuilder.create('home', LazyHomePageComponent).withTitle('pages.lazy.home.title').withMenuItem('pi pi-fw pi-users'));

@NgModule({
    imports: [RouterModule.forChild(routesBuilder.buildRoutes())],
    exports: [RouterModule]
})
export class LazyRoutingModule {}
