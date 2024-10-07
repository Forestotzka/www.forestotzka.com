import { Metadata } from 'next';
import Image from 'next/image';

import UpdateSvg from '@/components/svg/UpdateSvg';
import CloudUpSvg from '@/components/svg/CloudUpSvg';
import { News } from '@/utils/resources/News';
import { Text } from '@/utils/Text';

type Param = {
    id: string;
};

type Props = {
    params: Param;
};

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
    const news = new News(params.id);

    return {
        title: `${news.title} | ${Text.forestotzka}`,
        description: news.description,
        openGraph: {
            type: 'website',
            title: `${news.title} | ${Text.forestotzka}`,
            description: news.description,
        },
    };
}

export function generateStaticParams(): Param[] {
    return News.getIds().map((id) => {
        return { id };
    });
}

const Home = async ({ params }: Props): Promise<JSX.Element> => {
    const news = new News(params.id);

    return (
        <div className='py-14 px-2 max-w-4xl mx-auto'>
            <div className='pb-9 mb-9 border-b-1 border-black/25'>
                <div className='min-h-8 flex justify-end items-center gap-8 text-gray-500'>
                    <div className='flex gap-2'>
                        <div className='size-6 flex items-center fill-gray-500'>
                            <UpdateSvg />
                        </div>
                        <p>{news.formatLastUpdateDate()}</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className='size-6 flex items-center fill-gray-500'>
                            <CloudUpSvg />
                        </div>
                        <p>{news.formatPostDate()}</p>
                    </div>
                </div>
                <h1 className='py-5 font-semibold text-2xl lg:text-4xl'>{news.title}</h1>
                <div className='aspect-video bg-slate-400'>
                    <Image
                        src={`/resources/${news.type}/${news.id}/image.png`}
                        alt='News Thumbnail'
                        priority={true}
                        width={0}
                        height={0}
                        sizes='100vw'
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>
            <article className='prose prose-sm lg:prose-base prose-blue' dangerouslySetInnerHTML={{ __html: await news.formatContent() }}></article>
        </div>
    );
};

export default Home;
