import fetch from 'isomorphic-fetch';

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
interface IFetchResult {
  status: number;
  isOk: boolean;
  data: any;
}

function buildApiUrl(url: string, locale: string, params?: IQueryParams) {
  const fullUrl = `${process.env.DOMAIN_API}/${locale}/${url}`;
  return params ? formatQueryStringUrl(fullUrl, params) : fullUrl;
}

async function apiFetch(urlParams: IUrlParams, options?: RequestInit): Promise<IFetchResult> {
  if (!urlParams || !urlParams.url) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('Missed the "urlParams" in "apiFetch"');
    } else {
      console.error('Missed the "params" in "apiFetch"');
    }
  }

  const { url, locale = DEFAULT_LOCALE, params } = urlParams;
  const fetchUrl = buildApiUrl(url, locale, params);
  const res = await fetch(fetchUrl, options);
  const data = await res.json();

  return { status: res.status, isOk: res.ok, data };
}

export default apiFetch;
