import { transformerCopyButton } from '@rehype-pretty/transformers';
import { readFileSync } from 'fs';
import { join } from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeClassNames from 'rehype-class-names';

import { PostType } from '@/types/PostType';
import { remarkFixImgPath } from '@/utils/unifiedPlugins/remarkFixImgPath';

export type AbstractPostMetadata = {
    title: string;
    post_date: string;
    last_update_date: string;
};

export const RESOURCES_PATH = './public/resources';

export abstract class AbstractPost<T extends AbstractPostMetadata> {
    private _id: string;
    private _type: PostType;
    private _content: string;
    private _metadata: T;
    private _title: string;
    private _postDate: Date;
    private _lastUpdateDate: Date;

    public static ascendSortByPostDate(posts: AbstractPost<AbstractPostMetadata>[]): AbstractPost<AbstractPostMetadata>[] {
        return [...posts].sort((a, b) => (a._postDate > b._postDate ? 1 : -1));
    }

    public static descendSortByPostDate(posts: AbstractPost<AbstractPostMetadata>[]): AbstractPost<AbstractPostMetadata>[] {
        return [...posts].sort((a, b) => (a._postDate < b._postDate ? 1 : -1));
    }

    constructor(id: string, type: PostType) {
        const basePath = join(RESOURCES_PATH, type, id);

        this._id = id;
        this._type = type;
        this._content = readFileSync(join(basePath, 'content.md'), 'utf-8');
        this._metadata = JSON.parse(readFileSync(join(basePath, 'metadata.json'), 'utf-8'));
        this._title = this._metadata.title;
        this._postDate = new Date(this._metadata.post_date);
        this._lastUpdateDate = new Date(this._metadata.last_update_date);
    }

    protected get metadata(): T {
        return this._metadata;
    }

    public get id(): string {
        return this._id;
    }

    public get type(): string {
        return this._type;
    }

    public get content(): string {
        return this._content;
    }

    public get title(): string {
        return this._title;
    }

    public get postDate(): Date {
        return this._postDate;
    }

    public get lastUpdateDate(): Date {
        return this._lastUpdateDate;
    }

    public async formatContent(): Promise<string> {
        const content = await unified()
            .use(remarkParse)
            .use(remarkFixImgPath, {
                id: this._id,
                type: this._type,
            })
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypePrettyCode, {
                theme: 'one-dark-pro',
                defaultLang: 'text',
                transformers: [
                    transformerCopyButton({
                        visibility: 'hover',
                        feedbackDuration: 3_000,
                    }),
                ],
            })
            .use(rehypeStringify)
            .use(rehypeClassNames, {
                figure: 'text-xl',
            })
            .process(this._content);

        return content.toString();
    }

    public formatPostDate(): string {
        const timeFormat = Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        return timeFormat.format(this._postDate);
    }

    public formatLastUpdateDate(): string {
        const timeFormat = Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        return timeFormat.format(this._lastUpdateDate);
    }
}
