/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // The stock slate-500/600 fail WCAG AA on this near-black background
        // (4.22:1 and 2.65:1). These are the same hue lifted to 5.05:1 and
        // 4.60:1, so every existing `text-slate-500/600` passes without
        // touching the ~100 places they are used.
        slate: {
          500: '#708198',
          600: '#6A7A93',
        },
        brand: {
          DEFAULT: '#38CE00',
          light: '#4BE000',
          bright: '#5BFF1A',
          dark: '#2EB300',
          ink: '#04150A',
        },
        // `brand-glow` is referenced by the original markup but never made it
        // into its compiled CSS; defining it makes that hover state work.
        'brand-glow': '#5BFF1A',
        ink: {
          DEFAULT: '#06080A',
          700: '#161B22',
          800: '#10141A',
          950: '#06080A',
        },
      },
      keyframes: {
        marquee: { '0%': { transform: 'translate(0,0)' }, '100%': { transform: 'translate(-50%)' } },
        blip: {
          '0%,100%': { opacity: '.35', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.18)' },
        },
        pulseDot: {
          '0%': { boxShadow: '0 0 0 0 #38ce0099' },
          '70%': { boxShadow: '0 0 0 10px #38ce0000' },
          '100%': { boxShadow: '0 0 0 0 #38ce0000' },
        },
        aura: { '0%': { transform: 'rotate(0)' }, '100%': { transform: 'rotate(360deg)' } },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
