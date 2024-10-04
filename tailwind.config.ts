import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100ch',
                        'code::before': {
                            content: '',
                        },
                        'code::after': {
                            content: '',
                        },
                    },
                },
                sm: {
                    css: {
                        h1: {
                            fontSize: '1.25rem',
                            lineHeight: '1.75rem',
                        },
                        h2: {
                            fontSize: '1.125rem',
                            lineHeight: '1.75rem',
                        },
                    },
                },
                base: {
                    css: {
                        h1: {
                            fontSize: '1.875rem',
                            lineHeight: '2.25rem',
                        },
                    },
                },
            },
            borderWidth: {
                '1': '1px',
            },
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require('@tailwindcss/typography')],
};
export default config;
