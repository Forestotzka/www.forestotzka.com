import type { Metadata } from 'next';
import { ReactNode } from 'react';

import '@/styles/globals.css';

import Root from '@/components/Root';
import HeaderMenuProvider from '@/contexts/HeaderMenu';

export const metadata: Metadata = {
    title: 'エアリプの森',
    description:
        'Minecraftを中心に活動する「エアリプの森」メンバーによる、クリエイティブな作品や情報を発信するサイトです。ゲーム内での制作物の配布を行うだけでなく、メンバーが執筆する技術記事や、各自の趣味や日常生活に関するブログ記事も公開しています。',
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
