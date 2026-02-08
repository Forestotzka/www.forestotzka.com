import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export type StaffCareerItem = {
    from?: string;
    to?: string;
    title: string;
    org?: string;
    description?: string;
    links?: Array<{ label: string; url?: string }>;
};

export type StaffPortfolioItem = {
    title: string;
    url?: string;
    description?: string;
    tags?: string[];
};

type StaffMetadata = {
    name: string;
    description: string;
    introduction: string;
    bio?: string;
    skills?: string[];
    career?: StaffCareerItem[];
    portfolio?: StaffPortfolioItem[];
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
    private _bio?: string;
    private _skills: string[];
    private _career: StaffCareerItem[];
    private _portfolio: StaffPortfolioItem[];
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
        this._bio = this._metadata.bio;
        this._skills = this._metadata.skills ?? [];
        this._career = this._metadata.career ?? [];
        this._portfolio = this._metadata.portfolio ?? [];
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

    public get bio(): string | undefined {
        return this._bio;
    }

    public get skills(): string[] {
        return this._skills;
    }

    public get career(): StaffCareerItem[] {
        return this._career;
    }

    public get portfolio(): StaffPortfolioItem[] {
        return this._portfolio;
    }

    public get link(): Link {
        return this._link;
    }

    public get iconPath(): string {
        return `/staff/${this._id}/icon.png`;
    }
}
