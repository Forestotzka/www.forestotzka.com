import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

import '@/styles/globals.css';

import Root from '@/components/Root';
import HeaderMenuProvider from '@/contexts/HeaderMenu';
import { Text } from '@/utils/Text';

export const viewport: Viewport = {
    themeColor: '#15803d',
};

export const metadata: Metadata = {
    title: Text.forestotzka,
    description: Text.forestotzka_description,
};

type Props = {
    children: ReactNode;
};

const RootLayout = ({ children }: Props): JSX.Element => {
    return (
        <HeaderMenuProvider>
            <Root>{children}</Root>
        </HeaderMenuProvider>
    );
};

export default RootLayout;
