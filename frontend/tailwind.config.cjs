module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: '#0B0B0C',
        carbon: '#151517',
        slate: '#1D1F22',
        copper: '#B87333',
        amber: '#C47A2C',
        platinum: '#E6E6E6',
        muted: '#9A9A9A',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', '"Inter Tight"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(200, 122, 44, 0.25)',
      },
    },
  },
  plugins: [],
};

