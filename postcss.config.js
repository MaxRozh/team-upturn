module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-functions': {
      functions: {
        rem(val) {
          return `${val / 16}rem`;
        },
        mediaMin(val) {
          return `min-width:${val / 16}rem`;
        },
        mediaMax(val) {
          return `max-width:${val / 16}rem`;
        },
        percentage(i, e) {
          return `${(e * 100) / i}%`;
        }
      }
    }
  }
};
