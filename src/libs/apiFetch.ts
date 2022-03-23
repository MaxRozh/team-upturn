// import fetch from 'isomorphic-fetch';

import formatQueryStringUrl from 'utils/formatQueryStringUrl';
import { DEFAULT_LOCALE } from 'constants/locales';

type IQueryParams = {
  [key: string]: string | boolean | Array<string>;
};
interface IUrlParams {
  url: string;
  locale: string;
  params?: IQueryParams;
  token?: string;
}
interface IOptions {
  method?: string;
}

function buildApiUrl(url: string, locale: string, params?: IQueryParams) {
  const fullUrl = `${process.env.DOMAIN_API}/${locale}/${url}`;
  return params ? formatQueryStringUrl(fullUrl, params) : fullUrl;
}

export default function apiFetch(urlParams: IUrlParams, options?: IOptions): Promise<any> {
  if (!urlParams || !urlParams.url) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('Missed the "urlParams" in "apiFetch"');
    } else {
      console.error('Missed the "urlParams" in "apiFetch"');
    }
  }

  const { url, locale = DEFAULT_LOCALE, params } = urlParams;
  const fetchUrl = buildApiUrl(url, locale, params);

  if (options) {
    // if (options.method && options.method !== 'GET' && token) {
    //   if (!options.headers) {
    //     options.headers = {}; // eslint-disable-line no-param-reassign
    //   }
    //   options.headers['X-CSRF-Token'] = token; // eslint-disable-line no-param-reassign
    // }

    return fetch(fetchUrl, options);
  }

  return fetch(fetchUrl);
}
