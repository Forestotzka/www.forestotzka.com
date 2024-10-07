import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

type StaffMetadata = {
    name: string;
    description: string;
    introduction: string;
    link?: Link;
};

type Link = {
    youtube?: string;
    twitter?: string;
    reddit?: string;
    homepage?: string;
    others?: string[];
};

export class Staff {
    private _id: string;
    private _metadata: StaffMetadata;
    private _name: string;
    private _description: string;
    private _introduction: string;
    private _link: Link;

    public static getIds(): string[] {
        return readdirSync('./public/staff', 'utf-8');
    }

    constructor(id: string) {
        this._id = id;
        this._metadata = JSON.parse(readFileSync(join('./public/staff', id, 'metadata.json'), 'utf-8'));
        this._name = this._metadata.name;
        this._description = this._metadata.description;
        this._introduction = this._metadata.introduction;
        this._link = this._metadata.link ?? {};
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get introduction(): string {
        return this._introduction;
    }

    public get link(): Link {
        return this._link;
    }

    public get iconPath(): string {
        return `/staff/${this._id}/icon.png`;
    }
}
