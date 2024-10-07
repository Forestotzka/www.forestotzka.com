import Image from 'next/image';
import Link from 'next/link';

import PageTitle from '@/components/PageTitle';
import { Staff } from '@/utils/Staff';

const getStaff = (): Staff[] => {
    return Staff.getIds().map((id) => {
        return new Staff(id);
    });
};

const Home = (): JSX.Element => {
    const staff = getStaff();

    return (
        <>
            <PageTitle title='PROFILES' />
            <div className='grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-20'>
                {staff.map((member) => (
                    <Link key={member.id} href={`/profiles/${member.id}`}>
                        <div className='flex items-center gap-3 hover:opacity-75 transition-opacity duration-200'>
                            <div className='w-20 aspect-square flex-shrink-0 rounded-full overflow-hidden'>
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
                            <div className='flex-grow flex flex-col gap-2 flex-wrap'>
                                <p className='text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis'>{member.description}</p>
                                <p className='text-xl'>{member.name}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Home;
