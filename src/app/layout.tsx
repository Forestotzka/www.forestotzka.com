import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

import '@wooorm/starry-night/style/dark';

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
    openGraph: {
        type: 'website',
        title: Text.forestotzka,
        description: Text.forestotzka_description,
        images: `${Text.forestotzka_url}/forestotzka-eye-catching.png`,
    },
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
