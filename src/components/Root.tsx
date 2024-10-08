import { GoogleTagManager } from '@next/third-parties/google';
import { ReactNode } from 'react';
import RootBody from './RootBody';

type Props = {
    children: ReactNode;
};

const Root = ({ children }: Props): JSX.Element => {
    return (
        <html lang='ja'>
            <GoogleTagManager gtmId='GTM-PDSZTJL6' />
            <RootBody>{children}</RootBody>
        </html>
    );
};

export default Root;
