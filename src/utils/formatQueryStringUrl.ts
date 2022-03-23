type ParamsType = {
  [key: string]: string | boolean | Array<string>;
};

const formatQueryStringUrl = (url: string, params: ParamsType): string => {
  let fullUrl = `${url}?`;

  Object.keys(params).forEach((paramsKey) => {
    fullUrl += `${paramsKey}=${params[paramsKey]}&`;
  });

  return fullUrl.slice(0, -1);
};

export default formatQueryStringUrl;
