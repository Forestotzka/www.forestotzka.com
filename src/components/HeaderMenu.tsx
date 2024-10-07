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
            <div className={`fixed top-0 right-0 w-full h-dvh transition-opacity z-50 ${overlayClassName}`} onClick={toggleOpen}>
                <div className='h-full bg-black/30' />
            </div>
            <div className={`fixed top-0 right-0 max-w-60 w-60 h-dvh transition-transform duration-300 ease-in-out z-50 ${menuClassName}`}>
                <div className='flex flex-col h-full bg-green-700'>
                    <div className='px-5 flex justify-end items-center h-20'>
                        <div className='size-7 fill-white cursor-pointer' onClick={toggleOpen}>
                            <CrossSvg />
                        </div>
                    </div>
                    <nav className='py-5 flex-1 flex flex-col gap-7 overflow-y-auto'>
                        <div onClick={toggleOpen}>
                            <Link href='/news'>
                                <p className='text-lg text-center text-white hover:underline underline-offset-4'>NEWS</p>
                            </Link>
                        </div>
                        <div onClick={toggleOpen}>
                            <Link href='/products'>
                                <p className='text-lg text-center text-white hover:underline underline-offset-4'>PRODUCTS</p>
                            </Link>
                        </div>
                        <div onClick={toggleOpen}>
                            <Link href='/blogs'>
                                <p className='text-lg text-center text-white hover:underline underline-offset-4'>BLOGS</p>
                            </Link>
                        </div>
                        <div onClick={toggleOpen}>
                            <Link href='/profiles'>
                                <p className='text-lg text-center text-white hover:underline underline-offset-4'>PROFILES</p>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default HeaderMenu;
