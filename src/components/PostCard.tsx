import Image from 'next/image';
import Link from 'next/link';

import { PostType } from '@/types/PostType';
import { AbstractPost, AbstractPostMetadata } from '@/utils/resources/AbstractPost';

type Props = {
    post: AbstractPost<AbstractPostMetadata>;
    postType: PostType;
};

const PostCard = ({ post, postType }: Props): JSX.Element => {
    return (
        <div>
            <Link href={`${postType}/${post.id}`} className='hover:opacity-75 transition-opacity duration-200'>
                <div className='aspect-video bg-slate-400 rounded-md overflow-hidden'>
                    <Image
                        src={`/resources/${postType}/${post.id}/image.png`}
                        alt='Post Thumbnail'
                        priority={false}
                        width={0}
                        height={0}
                        sizes='100vw'
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                <div className='min-h-7 flex items-center'>
                    <p className='text-sm text-gray-500'>{post.formatPostDate()}</p>
                </div>
                <p>{post.title}</p>
            </Link>
        </div>
    );
};

export default PostCard;
