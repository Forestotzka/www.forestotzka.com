'use client';

import Link from 'next/link';
import Image from 'next/image';

import HamburgerMenuSvg from '@/components/svg/HamburgerMenuSvg';
import { useHeaderMenu } from '@/contexts/HeaderMenu';

const Header = (): JSX.Element => {
    const { toggleOpen } = useHeaderMenu();

    return (
        <header className='fixed w-full bg-green-700 shadow-xl z-50'>
            <div className='px-5 max-w-6xl mx-auto flex justify-between items-center h-20'>
                <Link href='/'>
                    <div className='w-36'>
                        <Image
                            src='/forestotzka-logo.png'
                            alt='Forestotzka Logo'
                            priority={true}
                            width={0}
                            height={0}
                            sizes='100vw'
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </Link>
                <nav className='hidden lg:flex gap-10'>
                    <Link href='/news'>
                        <p className='text-lg text-white hover:underline underline-offset-4'>NEWS</p>
                    </Link>
                    <Link href='/blogs'>
                        <p className='text-lg text-white hover:underline underline-offset-4'>BLOGS</p>
                    </Link>
                    <Link href='/profiles'>
                        <p className='text-lg text-white hover:underline underline-offset-4'>PROFILES</p>
                    </Link>
                </nav>
                <div className='hidden max-lg:block size-6 fill-white cursor-pointer' onClick={toggleOpen}>
                    <HamburgerMenuSvg />
                </div>
            </div>
        </header>
    );
};

export default Header;
