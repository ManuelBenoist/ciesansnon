import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './content/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        scene: {
          black: '#0c0c0c',
          dark: '#161616',
          surface: '#1e1e1e',
          border: '#2e2e2e',
          muted: '#5a5a5a',
          light: '#e8e2d9',
          cream: '#f5f0e8',
          brick: '#C4573A',
          navy: '#3A6B8A',
          rouge: '#8b2635',
        },
      },
      fontFamily: {
        display: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1' }],
        'display-lg': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15' }],
      },
    },
  },
}
