import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import UpdateSvg from '@/components/svg/UpdateSvg';
import CloudUpSvg from '@/components/svg/CloudUpSvg';
import { Blog } from '@/utils/resources/Blog';
import { Text } from '@/utils/Text';

type Param = {
    id: string;
};

type Props = {
    params: Param;
};

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
    const blog = new Blog(params.id);

    return {
        title: `${blog.title} | ${Text.forestotzka}`,
        description: blog.description,
        openGraph: {
            type: 'website',
            title: `${blog.title} | ${Text.forestotzka}`,
            description: blog.description,
        },
    };
}

export function generateStaticParams(): Param[] {
    return Blog.getIds().map((id) => {
        return { id };
    });
}

const Home = async ({ params }: Props): Promise<JSX.Element> => {
    const blog = new Blog(params.id);
    const content = await blog.formatContent();

    return (
        <div className='py-14 px-2 max-w-4xl mx-auto'>
            <div className='pb-9 mb-9 border-b-1 border-black/25'>
                <div className='min-h-8 flex justify-end items-center gap-8 text-gray-500'>
                    <div className='flex gap-2'>
                        <div className='size-6 flex items-center fill-gray-500'>
                            <UpdateSvg />
                        </div>
                        <p>{blog.formatLastUpdateDate()}</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className='size-6 flex items-center fill-gray-500'>
                            <CloudUpSvg />
                        </div>
                        <p>{blog.formatPostDate()}</p>
                    </div>
                </div>
                <div className='pt-5 min-h-8 flex justify-between text-gray-500'>
                    <div className='flex flex-wrap gap-5'>
                        {blog.tags.map((tag, index) => (
                            <div key={index} className='flex items-center'>
                                <Link href={`/blogs?tag=${tag}`}>
                                    <p className='hover:underline'>#{tag}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-wrap gap-8'>
                        {blog.staff.map((member, index) => (
                            <Link key={index} href={`/profiles/${member.id}`}>
                                <div className='flex items-center gap-2 hover:opacity-75 transition-opacity duration-200'>
                                    <div className='w-9 aspect-square rounded-full overflow-hidden'>
                                        <Image
                                            src={member.iconPath}
                                            alt='Staff Icon'
                                            priority={false}
                                            width={0}
                                            height={0}
                                            sizes='100vw'
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                    <p>{member.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <h1 className='py-5 font-semibold text-2xl lg:text-4xl'>{blog.title}</h1>
                <div className='aspect-video bg-slate-400'>
                    <Image
                        src={blog.imagePath}
                        alt='News Thumbnail'
                        priority={true}
                        width={0}
                        height={0}
                        sizes='100vw'
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>
            <article className='prose prose-sm lg:prose-base prose-blue' dangerouslySetInnerHTML={{ __html: content }}></article>
        </div>
    );
};

export default Home;
