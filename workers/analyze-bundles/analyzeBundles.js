/* eslint-disable @typescript-eslint/no-var-requires, global-require */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const prompts = require('prompts');

const previousSizeArr = require('../../analyze/previous-comparison');
const formatBytes = require('./formatBytes');
const getDiff = require('./getDiff');
const colorfulConsole = require('../utils/colorfulConsole');
const { getBundleComparisonTemplate, getPageSizesInArrTemplate } = require('./templates');

let bundle = {};

try {
  bundle = require('../../.next/build-manifest.json');
} catch (e) {
  colorfulConsole({ message: '[Warning] Please, first run yarn build:prod', isWarn: true, hasEndLine: true });
  throw e;
}

const pathToBuildDir = path.resolve(__dirname, '../../.next');
const outputDir = path.resolve(__dirname, '../../analyzes');
const outputFile = path.join(outputDir, 'bundle-comparison.md');
const pageSizesInArrOutputFile = path.join(outputDir, 'previous-comparison.js');
const readmeFilePath = path.resolve(__dirname, '../../README.md');

let totalCurrentSize = 0;
let totalPreviousSize = 0;

colorfulConsole({ message: 'Start analyzing', hasStartLine: true });

colorfulConsole({ message: '[1/4] Calculating bundle sizes...' });
const pageSizesArr = Object.keys(bundle.pages).map((page) => {
  const files = bundle.pages[page];
  const size = files
    .map((filename) => {
      const bytes = fs.readFileSync(path.join(pathToBuildDir, filename));
      const gzipped = zlib.gzipSync(bytes);

      return gzipped.byteLength;
    })
    .reduce((s, b) => s + b, 0);

  return { pagePath: page, size };
});

colorfulConsole({ message: '[2/4] Formatting for view...' });
// Produce a Markdown table with each page & its size
const sizesForView = pageSizesArr
  .map(({ pagePath, size }) => {
    const previousPageSize = previousSizeArr.find((item) => item.pagePath === pagePath) || { size: 0 };
    const currentSize = formatBytes(size);
    const previousSize = formatBytes(previousPageSize.size);
    const diffSize = getDiff(size, previousPageSize.size);
    totalCurrentSize += size;
    totalPreviousSize += previousPageSize.size;

    return `| \`${pagePath}\` | ${currentSize} | ${previousSize} | ${diffSize} |`;
  })
  .join('\n');

const totalSizesDiff = getDiff(totalCurrentSize, totalPreviousSize);

const checkIfNeedToContinue = async () => {
  const response = await prompts({
    type: 'confirm',
    name: 'value',
    message: 'There are no changes. Do you want to continue?',
    initial: false
  });

  return response.value;
};

(async () => {
  let isNeedToWriteToFiles = true;

  if (totalSizesDiff === '+0.00%') {
    isNeedToWriteToFiles = await checkIfNeedToContinue();
  }

  if (isNeedToWriteToFiles) {
    colorfulConsole({ message: '[3/4] Updating Readme.md...' });

    const readmeData = fs.readFileSync(readmeFilePath, 'utf-8');
    const updatedReadmeData = readmeData.replace(/_\[`(.*?)`\]_/i, `_[\`${totalSizesDiff}\`]_`);
    fs.writeFileSync(readmeFilePath, updatedReadmeData);

    colorfulConsole({ message: '[success] Updated Readme.md', isInfo: true });

    try {
      fs.mkdirSync(outputDir);
    } catch (e) {
      // may already exist
    }

    colorfulConsole({ message: '[4/4] Updating analyze files...' });

    fs.writeFileSync(outputFile, getBundleComparisonTemplate(sizesForView, totalSizesDiff));
    fs.writeFileSync(pageSizesInArrOutputFile, getPageSizesInArrTemplate(pageSizesArr));

    colorfulConsole({ message: '[success] Updated analyze files', isInfo: true, hasEndLine: true });
  } else {
    colorfulConsole({ message: 'End of bundle analyzing without file updating', isInfo: true, hasEndLine: true });
  }

  colorfulConsole({ message: `Total bundle size diff: ${totalSizesDiff}`, isWarn: true });
})();
