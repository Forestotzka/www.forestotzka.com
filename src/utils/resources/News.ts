import { readdirSync } from 'fs';
import { join } from 'path';

import { AbstractPost, AbstractPostMetadata, RESOURCES_PATH } from '@/utils/resources/AbstractPost';

type NewsMetadata = AbstractPostMetadata & {
    description: string;
};

const resourceName = 'news';

export class News extends AbstractPost<NewsMetadata> {
    private _description: string;

    public static getIds(): string[] {
        return readdirSync(join(RESOURCES_PATH, resourceName), 'utf-8');
    }

    constructor(id: string) {
        super(id, resourceName);
        this._description = this.metadata.description;
    }

    public get description(): string {
        return this._description;
    }
}
