/* eslint-disable @typescript-eslint/no-var-requires */

const webpack = require('webpack');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { withSentryConfig } = require('@sentry/nextjs');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.APP_ANALYZE === 'true'
});

require('dotenv').config({ debug: process.env.DEBUG });

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  poweredByHeader: false,
  pageExtensions:
    process.env.NODE_ENV !== 'production' || process.env.WITH_LAYOUT_PAGES === 'true'
      ? ['ts', 'tsx', 'layout.tsx']
      : ['ts', 'tsx'],
  i18n,
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV !== 'production'
  },
  webpack: (config) => {
    const newConfig = { ...config };

    newConfig.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    // COMMON PLUGINS
    newConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env.DOMAIN_API': JSON.stringify(process.env.DOMAIN_API)
      })
    );

    // DEV PLUGINS
    if (process.env.NODE_ENV === 'development') {
      newConfig.plugins.push(
        new webpack.ProvidePlugin({
          log: `${__dirname}/plugins/logger.js`
        })
      );
      newConfig.plugins.push(
        new FilterWarningsPlugin({
          exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
        })
      );
    }

    // PROD PLUGINS
    if (process.env.NODE_ENV === 'production') {
      newConfig.plugins.push(new WebpackManifestPlugin());
    }

    return newConfig;
  }
};

const SentryWebpackPluginOptions = {
  project: process.env.SENTRY_PROJECT,
  ignore: ['node_modules'],
  configFile: 'sentry.properties',
  silent: true
};

module.exports = withPWA(withBundleAnalyzer(nextConfig));
