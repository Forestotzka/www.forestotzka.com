'use client';

import React, { ReactNode } from 'react';

import Header from '@/components/Header';
import HeaderMenu from '@/components/HeaderMenu';
import { useHeaderMenu } from '@/contexts/HeaderMenu';

type Props = {
    children: ReactNode;
};

const LayoutChild = ({ children }: Props): JSX.Element => {
    const { open } = useHeaderMenu();

    return (
        <html lang='ja'>
            <body className={open ? 'overflow-hidden' : ''}>
                <Header />
                {children}
                <HeaderMenu />
            </body>
        </html>
    );
};

export default LayoutChild;
