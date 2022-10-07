import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {MngCommonsModule} from '@mediusinc/mng-commons';

export const sharedAngularModules = [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule];
export const thirdPartyModules = [MngCommonsModule, TranslateModule];
