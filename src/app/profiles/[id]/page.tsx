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
            <div className='pt-8'>
                <p className='text-xl text-center break-words'>{staff.introduction}</p>
            </div>
        </>
    );
};

export default Home;
