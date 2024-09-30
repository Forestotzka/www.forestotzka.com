'use client';

import Link from 'next/link';

import HamburgerMenuSvg from '@/components/svg/HamburgerMenuSvg';
import { useHeaderMenu } from '@/contexts/HeaderMenu';

const Header = (): JSX.Element => {
    const { toggleOpen } = useHeaderMenu();

    return (
        <header className='fixed w-dvw bg-green-700 shadow-xl'>
            <div className='px-5 max-w-6xl mx-auto flex justify-between items-center h-20'>
                <Link href='/'>
                    <p className='text-xl text-white hover:underline underline-offset-4 decoration-1'>エアリプの森</p>
                </Link>
                <nav className='hidden lg:flex gap-10'>
                    <Link href='/news'>
                        <p className='text-lg text-white hover:underline underline-offset-4'>NEWS</p>
                    </Link>
                    <Link href='/products'>
                        <p className='text-lg text-white hover:underline underline-offset-4'>PRODUCTS</p>
                    </Link>
                    <Link href='/blogs'>
                        <p className='text-lg text-white hover:underline underline-offset-4'>BLOGS</p>
                    </Link>
                    <Link href='/profiles'>
                        <p className='text-lg text-white hover:underline underline-offset-4'>PROFILES</p>
                    </Link>
                </nav>
                <div className='hidden max-lg:block size-8 text-white cursor-pointer' onClick={toggleOpen}>
                    <HamburgerMenuSvg />
                </div>
            </div>
        </header>
    );
};

export default Header;
