import { Metadata } from 'next';
import Image from 'next/image';

import YouTubeSvg from '@/components/svg/YouTubeSvg';
import TwitterSvg from '@/components/svg/TwitterSvg';
import RedditSvg from '@/components/svg/RedditSvg';
import HomeSvg from '@/components/svg/HomeSvg';
import LinkSvg from '@/components/svg/LinkSvg';
import { Staff } from '@/utils/Staff';
import { Text } from '@/utils/Text';

type Param = {
    id: string;
};

type Props = {
    params: Param;
};

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
    const staff = new Staff(params.id);

    return {
        title: `${staff.name} | ${Text.forestotzka}`,
        description: staff.introduction,
        openGraph: {
            type: 'website',
            title: `${staff.name} | ${Text.forestotzka}`,
            description: staff.introduction,
            images: `${Text.forestotzka_url}${staff.iconPath}`,
        },
        twitter: {
            card: 'summary',
        },
    };
}

export function generateStaticParams(): Param[] {
    return Staff.getIds().map((id) => {
        return { id };
    });
}

const Home = ({ params }: Props): JSX.Element => {
    const staff = new Staff(params.id);

    return (
        <>
            <div className='pt-16 flex flex-col md:flex-row justify-center items-center gap-5'>
                <div className='w-28 md:w-40 aspect-square rounded-full overflow-hidden'>
                    <Image src={staff.iconPath} alt='Staff Icon' priority={true} width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} />
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-4 text-center md:text-left'>
                        <p className='text-base text-gray-600'>{staff.description}</p>
                        <p className='text-xl md:text-2xl'>{staff.name}</p>
                    </div>
                    <div className='flex flex-wrap justify-center md:justify-start items-center gap-5'>
                        {staff.link.youtube && (
                            <a href={staff.link.youtube} target='_blank' rel='noreferrer'>
                                <div className='size-9 flex items-center cursor-pointer fill-black hover:fill-red-500 transition-colors duration-300'>
                                    <YouTubeSvg />
                                </div>
                            </a>
                        )}
                        {staff.link.twitter && (
                            <a href={staff.link.twitter} target='_blank' rel='noreferrer'>
                                <div className='size-8 flex items-center cursor-pointer fill-black hover:fill-sky-500 transition-colors duration-300'>
                                    <TwitterSvg />
                                </div>
                            </a>
                        )}
                        {staff.link.reddit && (
                            <a href={staff.link.reddit} target='_blank' rel='noreferrer'>
                                <div className='size-8 flex items-center cursor-pointer fill-black hover:fill-orange-500 transition-colors duration-300'>
                                    <RedditSvg />
                                </div>
                            </a>
                        )}
                        {staff.link.homepage && (
                            <a href={staff.link.homepage} target='_blank' rel='noreferrer'>
                                <div className='size-8 flex items-center cursor-pointer fill-black hover:fill-green-600 transition-colors duration-300'>
                                    <HomeSvg />
                                </div>
                            </a>
                        )}
                        {staff.link.others &&
                            staff.link.others.map((link, index) => (
                                <a key={index} href={link} target='_blank' rel='noreferrer'>
                                    <div className='size-8 flex items-center cursor-pointer fill-black hover:fill-green-600 transition-colors duration-300'>
                                        <LinkSvg />
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            </div>
            <div className='pt-8 flex flex-col gap-10'>
                <p className='text-xl text-center break-words'>{staff.introduction}</p>

                {staff.bio && (
                    <section className='max-w-3xl mx-auto w-full'>
                        <h2 className='text-lg font-semibold'>ABOUT</h2>
                        <p className='pt-3 text-base leading-7 whitespace-pre-line break-words text-gray-700'>{staff.bio}</p>
                    </section>
                )}

                {staff.skills.length > 0 && (
                    <section className='max-w-3xl mx-auto w-full'>
                        <h2 className='text-lg font-semibold'>SKILLS</h2>
                        <div className='pt-3 flex flex-wrap gap-2'>
                            {staff.skills.map((skill) => (
                                <span key={skill} className='px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm'>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {staff.career.length > 0 && (
                    <section className='max-w-3xl mx-auto w-full'>
                        <h2 className='text-lg font-semibold'>CAREER</h2>
                        <div className='pt-4 flex flex-col gap-5'>
                            {staff.career.map((item, index) => (
                                <div key={index} className='p-4 rounded-xl border border-gray-200'>
                                    <div className='flex flex-col md:flex-row md:items-baseline md:justify-between gap-1'>
                                        <p className='text-base font-medium'>
                                            {item.title}
                                            {item.org ? <span className='text-gray-500'> / {item.org}</span> : null}
                                        </p>
                                        {(item.from || item.to) && (
                                            <p className='text-sm text-gray-500'>
                                                {item.from ?? ''}
                                                {item.from || item.to ? ' - ' : ''}
                                                {item.to ?? ''}
                                            </p>
                                        )}
                                    </div>
                                    {item.description && <p className='pt-2 text-sm leading-6 whitespace-pre-line text-gray-700'>{item.description}</p>}
                                    {item.links && item.links.length > 0 && (
                                        <div className='pt-3 flex flex-wrap gap-3'>
                                            {item.links.map((link, linkIndex) => (
                                                <div key={linkIndex}>
                                                    {link.url ? (
                                                        <a
                                                            href={link.url}
                                                            target='_blank'
                                                            rel='noreferrer'
                                                            className='text-sm underline underline-offset-4 hover:opacity-75'
                                                        >
                                                            {link.label}
                                                        </a>
                                                    ) : (
                                                        <span className='text-sm text-gray-600'>{link.label}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {staff.portfolio.length > 0 && (
                    <section className='max-w-3xl mx-auto w-full'>
                        <h2 className='text-lg font-semibold'>PORTFOLIO</h2>
                        <div className='pt-4 grid grid-cols-1 gap-4'>
                            {staff.portfolio.map((work, index) => (
                                <div key={index} className='block p-4 rounded-xl border border-gray-200'>
                                    <div className='flex items-center justify-between gap-3'>
                                        {work.url ? (
                                            <a href={work.url} target='_blank' rel='noreferrer' className='flex-grow hover:opacity-80 transition-opacity'>
                                                <p className='text-base font-medium break-words'>{work.title}</p>
                                            </a>
                                        ) : (
                                            <p className='text-base font-medium break-words'>{work.title}</p>
                                        )}
                                        {work.url && (
                                            <a href={work.url} target='_blank' rel='noreferrer' className='size-5 flex-shrink-0 fill-gray-700 hover:opacity-80 transition-opacity'>
                                                <LinkSvg />
                                            </a>
                                        )}
                                    </div>
                                    {work.description && <p className='pt-2 text-sm leading-6 whitespace-pre-line text-gray-700'>{work.description}</p>}
                                    {work.tags && work.tags.length > 0 && (
                                        <div className='pt-3 flex flex-wrap gap-2'>
                                            {work.tags.map((tag) => (
                                                <span key={tag} className='px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs'>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default Home;
