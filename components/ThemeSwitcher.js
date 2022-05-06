import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'react-feather';

const ThemeSwitcher = ({ }) => {
    const [ mounted, setMounted ] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) {
        return null
    }

    return (
        <>
        {
            resolvedTheme === "light" 
            ? <button className={`p-1 shadow rounded-full text-white bg-black hover:text-nctdream`} 
                    onClick={() => setTheme('dark')}>
                <Moon />
            </button>
            : <button className={`p-1 shadow rounded-full text-black bg-nctdream hover:bg-white`} 
                    onClick={() => setTheme('light')}>
                <Sun />
            </button>
        }
        </>
    );

}

export default ThemeSwitcher;