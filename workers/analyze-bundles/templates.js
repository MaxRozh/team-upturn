/* eslint-disable @typescript-eslint/no-var-requires, global-require */

const { format } = require('date-fns');

const getBundleComparisonTemplate = (sizesForView, totalSizesDiff) => `# Bundle Size

Total difference with previous: ${totalSizesDiff}

| Route | Size (gzipped) | Previous size | Difference (%) |
| :---   | :---          | :---          | :---           |
${sizesForView}

*Updated: ${format(new Date(), 'MM.dd.yyyy')}*
`;

const getPageSizesInArrTemplate = (pageSizesArr) => `// For comparing with previous
module.exports = [${pageSizesArr.map(({ pagePath, size }) => `{ pagePath: '${pagePath}', size: ${size} }`)}];

`;

module.exports = {
  getBundleComparisonTemplate,
  getPageSizesInArrTemplate
};
