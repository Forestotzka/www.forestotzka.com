import { readdirSync } from 'fs';
import { join } from 'path';

import { AbstractPost, AbstractPostMetadata, RESOURCES_PATH } from '@/utils/resources/AbstractPost';

const RESOURCE_NAME = 'news';

export class News extends AbstractPost<AbstractPostMetadata> {
    public static getIds(): string[] {
        return readdirSync(join(RESOURCES_PATH, RESOURCE_NAME), 'utf-8');
    }

    constructor(id: string) {
        super(id, RESOURCE_NAME);
    }
}
