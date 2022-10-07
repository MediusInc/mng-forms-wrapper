import {ObjectSerializer} from '@mediusinc/mng-commons';

// copied and modified from /generated-sources/models.ts
const typeMap: {[index: string]: any} = {
    // TODO: add types here
};

// copied and modified from /generated-sources/models.ts
const enumsMap: {[index: string]: any} = {
    // TODO: add enums here
};

ObjectSerializer.get().registerEnums(enumsMap);
ObjectSerializer.get().registerTypes(typeMap);
