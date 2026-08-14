/** @type {import('tailwindcss').Config} */

/**
 * Colour slots follow design-system.md exactly (11 semantic slots).
 * Palette direction from the brief: cool blue + coral.
 *
 * DEVIATION from the reference values:
 *   primary-dark  #5fa9d6 -> #2E7DB0
 *   accent-dark   #d97e54 -> #C46639
 *   muted         #6A6A6A -> #5A5A5A
 * Reason: the reference uses primary-dark and accent-dark as TEXT colours on
 * white (eyebrows, tertiary links, status labels). At #5fa9d6 that is roughly
 * 2.4:1 against #FFFFFF, well under the 4.5:1 needed for body-size text.
 * The fill colours (primary, accent) are untouched, so the brand reads
 * identically -- only the text-weight variants were darkened.
 *
 * To revert: restore the three hex values above.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#85C4EB',
        'primary-mid': '#5FA9D6',
        'primary-dark': '#2E7DB0',
        'primary-light': '#B3D9F2',
        accent: '#E8956F',
        'accent-dark': '#C46639',
        background: '#F9F9F9',
        surface: '#FFFFFF',
        ink: '#1A1A1A',
        muted: '#5A5A5A',
        divider: '#E0E0E0',
        deep: '#0F1419',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
