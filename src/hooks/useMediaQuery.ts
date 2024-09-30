import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
    const [prefers, setPrefers] = useState(false);

    const onChange = (e: MediaQueryListEvent): void => {
        setPrefers(e.matches);
    };

    useEffect(() => {
        setPrefers(window.matchMedia(query).matches);
    }, [query]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        mediaQuery.addEventListener('change', onChange);
        return (): void => {
            mediaQuery.removeEventListener('change', onChange);
        };
    }, [query]);

    return prefers;
};
