import { readFileSync } from 'fs';
import { join } from 'path';

type StaffMetadata = {
    name: string;
};

export class Staff {
    private _id: string;
    private _metadata: StaffMetadata;
    private _name: string;

    constructor(id: string) {
        this._id = id;
        this._metadata = JSON.parse(readFileSync(join('./public/staff', id, 'metadata.json'), 'utf-8'));
        this._name = this._metadata.name;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }
}
