/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        electric: '#db00ff',
        ribbon: '#0047ff',
        primary: '#676FC6',
        point: {
          blue: '#537FEE',
          red: '#FF451A',
          yellow: '#F8AC19',
          lilac: '#C2C5E8',
        },
        fontColor: {
          redLabel: 'EE5353',
          gray01: '#333',
          gray02: '#4D4D4D',
          gray03: '#666',
          gray04: '#808080',
          gray05: '#999',
          gray06: '#B3B3B3',
          gray07: '#CCC',
          gray08: '#E6E6E6',
          gray09: '#F6F6F6',
        },
        line: {
          gray: '#E6E6E6',
        },
      },
      borderRadius: {
        default: '0.625rem' /* 10px */,
      },
    },
  },
  plugins: [],
};
