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
          gold: '#c9a84c',
          'gold-dim': '#8a6e2f',
          rouge: '#8b2635',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.1' }],
        'display-lg': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.15' }],
      },
    },
  },
}
