import { useLayoutEffect, useState } from 'react';

export function useWindowResize() {
    const [size, setSize] = useState<[number, number]>([
        window.innerWidth,
        window.innerHeight,
    ]);

    function listener() {
        setSize([window.innerWidth, window.innerHeight]);
    }

    useLayoutEffect(() => {
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener);
        };
    }, []);

    return size;
}
