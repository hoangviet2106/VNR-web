/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          700: '#1c2942',
          800: '#111a2e',
          900: '#0a1120',
          950: '#050810',
        },
        glow: {
          DEFAULT: '#22d3ee',
          dim: '#0e7490',
        },
        energy: '#fbbf24',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 5px #22d3ee, 0 0 20px rgba(34, 211, 238, 0.5)',
        'neon-strong':
          '0 0 8px #22d3ee, 0 0 30px rgba(34, 211, 238, 0.7), 0 0 60px rgba(34, 211, 238, 0.3)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px #22d3ee, 0 0 20px rgba(34, 211, 238, 0.4)' },
          '50%': { boxShadow: '0 0 10px #22d3ee, 0 0 40px rgba(34, 211, 238, 0.7)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        blink: 'blink 1.2s step-end infinite',
      },
    },
  },
  plugins: [],
};
