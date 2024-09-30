'use client';

import Link from 'next/link';

import CrossSvg from '@/components/svg/CrossSvg';
import { useHeaderMenu } from '@/contexts/HeaderMenu';

const HeaderMenu = (): JSX.Element => {
    const { open, toggleOpen } = useHeaderMenu();

    const overlayClassName = open ? '' : 'opacity-0 pointer-events-none';
    const menuClassName = open ? 'translate-x-0' : 'translate-x-full';

    return (
        <div>
            <div className={`fixed top-0 right-0 w-dvw h-dvh transition-opacity ${overlayClassName}`} onClick={toggleOpen}>
                <div className='h-full bg-black/30' />
            </div>
            <div className={`fixed top-0 right-0 max-w-60 w-60 h-dvh transition-transform duration-300 ease-in-out ${menuClassName}`}>
                <div className='flex flex-col h-full bg-green-700'>
                    <div className='px-5 flex justify-end items-center h-20'>
                        <div className='size-8 text-white cursor-pointer' onClick={toggleOpen}>
                            <CrossSvg />
                        </div>
                    </div>
                    <nav className='py-5 flex-1 flex flex-col gap-7 overflow-y-auto'>
                        <Link href='/news'>
                            <p className='text-lg text-center text-white'>NEWS</p>
                        </Link>
                        <Link href='/products'>
                            <p className='text-lg text-center text-white'>PRODUCTS</p>
                        </Link>
                        <Link href='/blogs'>
                            <p className='text-lg text-center text-white'>BLOGS</p>
                        </Link>
                        <Link href='/profiles'>
                            <p className='text-lg text-center text-white'>PROFILES</p>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default HeaderMenu;
