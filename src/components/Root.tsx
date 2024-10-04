'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';

import Header from '@/components/Header';
import HeaderMenu from '@/components/HeaderMenu';
import { useHeaderMenu } from '@/contexts/HeaderMenu';
import { useElementSize } from '@/hooks/useElementSize';

type Props = {
    children: ReactNode;
};

const Root = ({ children }: Props): JSX.Element => {
    const { open } = useHeaderMenu();

    const elementRef = useRef<HTMLBodyElement>(null);
    const elementSize = useElementSize(elementRef);

    const [scrollbarVisible, setScrollbarVisible] = useState(false);

    useEffect(() => {
        setScrollbarVisible(document.body.clientHeight > window.innerHeight);
    }, [elementSize]);

    return (
        <html lang='ja'>
            <body className={open ? 'overflow-hidden' : ''} ref={elementRef}>
                <div className={open && scrollbarVisible ? 'protect-scrollbar-diff' : ''}>
                    <Header />
                    <main className='pt-20 px-5 max-w-6xl mx-auto'>{children}</main>
                    <HeaderMenu />
                </div>
            </body>
        </html>
    );
};

export default Root;
