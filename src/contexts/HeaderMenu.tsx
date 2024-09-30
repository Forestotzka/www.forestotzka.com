'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type Props = {
    children: ReactNode;
};

type ContextHeaderMenu = {
    open: boolean;
    toggleOpen: () => void;
};

const HeaderMenu = createContext<ContextHeaderMenu>({
    open: false,
    toggleOpen: () => {},
});

export const useHeaderMenu = (): ContextHeaderMenu => {
    return useContext(HeaderMenu);
};

const HeaderMenuProvider = ({ children }: Props): JSX.Element => {
    const [open, setOpen] = useState(false);

    const toggleOpen = (): void => {
        setOpen((prev) => !prev);
    };

    const value: ContextHeaderMenu = {
        open,
        toggleOpen,
    };

    return <HeaderMenu.Provider value={value}>{children}</HeaderMenu.Provider>;
};

export default HeaderMenuProvider;
