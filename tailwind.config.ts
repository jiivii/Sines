import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        salvia: '#9CAE9F', terracota: '#E3A995', niebla: '#9EAEB5', ocre: '#DCC088',
        amarillo: '#D9B96E', azul: '#9DB7C4', verde: '#8DAA91', naranja: '#DFA394',
        hoja: '#5A665A', lino: '#F8F3ED', bosque: '#3E4A41', tinta: '#2F3A33',
        bg: 'var(--bg)', panel: 'var(--panel)', ink: 'var(--ink)', soft: 'var(--soft)', line: 'var(--line)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond Variable"', '"Cormorant Garamond"', '"Iowan Old Style"', 'Georgia', 'serif'],
        sans: ['"Jost Variable"', 'Jost', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
