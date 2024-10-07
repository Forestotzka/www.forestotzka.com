import Image from 'next/image';
import Link from 'next/link';

import { News } from '@/utils/resources/News';

type Props = {
    news: News;
};

const NewsCard = ({ news }: Props): JSX.Element => {
    return (
        <div>
            <Link href={`/${news.type}/${news.id}`} className='hover:opacity-75 transition-opacity duration-200'>
                <div className='aspect-video bg-slate-400 rounded-md overflow-hidden'>
                    <Image
                        src={news.imagePath}
                        alt='Post Thumbnail'
                        priority={false}
                        width={0}
                        height={0}
                        sizes='100vw'
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                <div className='min-h-7 flex items-center'>
                    <p className='text-sm text-gray-500'>{news.formatPostDate()}</p>
                </div>
                <p>{news.title}</p>
            </Link>
        </div>
    );
};

export default NewsCard;
