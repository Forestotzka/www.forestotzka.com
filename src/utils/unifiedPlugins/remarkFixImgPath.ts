import { Image } from 'mdast';
import { Plugin } from 'unified';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

type Option = {
    id: string;
    type: string;
};

export const remarkFixImgPath: Plugin<[Option]> = (option) => {
    return (tree: Node) => {
        visit(tree, 'image', (node: Image) => {
            if (node.url.startsWith('/public')) {
                node.url = node.url.replace('/public', '');
            } else if (!(node.url.startsWith('https://') || node.url.startsWith('http://'))) {
                node.url = `/resources/${option.type}/${option.id}/${node.url}`;
            }
        });
    };
};
