import { readdirSync } from 'fs';
import { join } from 'path';

import { StaffId } from '@/types/StaffId';
import { AbstractPost, AbstractPostMetadata, RESOURCES_PATH } from '@/utils/resources/AbstractPost';
import { Staff } from '@/utils/Staff';

type BlogMetadata = AbstractPostMetadata & {
    staff: StaffId[];
    tags?: string[];
};

const RESOURCE_NAME = 'blogs';

export class Blog extends AbstractPost<BlogMetadata> {
    private _staff: Staff[];
    private _tags: string[];

    public static getIds(): string[] {
        return readdirSync(join(RESOURCES_PATH, RESOURCE_NAME), 'utf-8');
    }

    constructor(id: string) {
        super(id, RESOURCE_NAME);
        this._staff = this.metadata.staff.map((id) => {
            return new Staff(id);
        });
        this._tags = this.metadata.tags ?? [];
    }

    public get staff(): Staff[] {
        return this._staff;
    }

    public get tags(): string[] {
        return this._tags;
    }
}
