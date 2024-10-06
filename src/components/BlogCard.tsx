import Image from 'next/image';
import Link from 'next/link';

import { Blog } from '@/utils/resources/Blog';

type Props = {
    blog: Blog;
};

const BlogCard = ({ blog }: Props): JSX.Element => {
    return (
        <div>
            <Link href={`${blog.type}/${blog.id}`} className='hover:opacity-75 transition-opacity duration-200'>
                <div className='aspect-video bg-slate-400 rounded-md overflow-hidden'>
                    <Image
                        src={`/resources/${blog.type}/${blog.id}/image.png`}
                        alt='Post Thumbnail'
                        priority={false}
                        width={0}
                        height={0}
                        sizes='100vw'
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                <div className='min-h-7 flex items-center'>
                    <p className='text-sm text-gray-500'>{blog.formatPostDate()}</p>
                </div>
                <p>{blog.title}</p>
            </Link>
            <div className='flex flex-wrap gap-2'>
                {blog.staff.map((member, index) => (
                    <Link key={index} href={`profiles/${member.id}`}>
                        <div className='mt-1 w-7 aspect-square rounded-full overflow-hidden hover:opacity-75 transition-opacity duration-200'>
                            <Image
                                src={`/staff/${member.id}/icon.png`}
                                alt='Staff Icon'
                                priority={false}
                                width={0}
                                height={0}
                                sizes='100vw'
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogCard;
