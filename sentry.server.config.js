import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  enabled: !!process.env.SENTRY_DSN,
  dsn: SENTRY_DSN,
  ignoreErrors: [
    // eslint-disable-next-line max-len
    /* start ignoring browser aborting (https://forum.sentry.io/t/typeerror-failed-to-fetch-reported-over-and-overe/8447/2) */
    'TypeError: Failed to fetch',
    'TypeError: NetworkError when attempting to fetch resource',
    'TypeError: отменено',
    'Error: AbortError: The operation was aborted',
    'TypeError: скасовано',
    'TypeError: cancelled',
    'TypeError: cancelado',
    /* end ignoring browser aborting */
    'TypeError: Сетевое соединение потеряно.',
    'TypeError: Вероятно, соединение с интернетом прервано.'
  ]
});
