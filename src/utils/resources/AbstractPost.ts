import { transformerCopyButton } from '@rehype-pretty/transformers';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Image } from 'mdast';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeClassNames from 'rehype-class-names';

import { PostType } from '@/types/PostType';

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
            .use(this.remarkFixImgPath.bind(this))
            .use(remarkRehype)
            .use(rehypePrettyCode, {
                theme: 'one-dark-pro',
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

    private remarkFixImgPath(): (tree: Node) => void {
        return (tree: Node) => {
            visit(tree, 'image', (node: Image) => {
                if (node.url.startsWith('/public')) {
                    node.url = node.url.replace('/public', '');
                } else if (!(node.url.startsWith('https://') || node.url.startsWith('http://'))) {
                    node.url = `/resources/${this._type}/${this._id}/${node.url}`;
                }
            });
        };
    }
}