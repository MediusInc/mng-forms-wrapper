import {HttpClient} from '@angular/common/http';

import {AMngCrudApiService, ClassType, MediusQueryResult, MngConfigurationService} from '@mediusinc/mng-commons';

export abstract class AStarterCrudApiService<T, QRT extends MediusQueryResult<T>> extends AMngCrudApiService<T, QRT> {
    protected readonly configService: MngConfigurationService;

    protected constructor(type: ClassType<T>, queryResultType: ClassType<QRT>, http: HttpClient) {
        super(type, queryResultType, http);
        this.configService = MngConfigurationService.get();
    }

    protected getBasePath() {
        return `${this.configService.getConfigValue('coreBasePath')}/api/v1`;
    }
}
