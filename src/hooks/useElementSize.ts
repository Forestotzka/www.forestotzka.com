import { RefObject, useEffect, useState } from 'react';

type Size = {
    width: number;
    height: number;
};

export const useElementSize = (ref: RefObject<HTMLElement>): Size => {
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });

    useEffect(() => {
        const getSize = (): Size => ({
            width: ref.current ? ref.current.offsetWidth : 0,
            height: ref.current ? ref.current.offsetHeight : 0,
        });

        const handleResize = (): void => {
            setSize(getSize());
        };

        if (ref.current) {
            setSize(getSize());
        }

        window.addEventListener('resize', handleResize);

        return (): void => {
            window.removeEventListener('resize', handleResize);
        };
    }, [ref]);

    return size;
};
