function formatBytes(bytes, signed = false) {
  // eslint-disable-next-line no-nested-ternary
  const sign = signed ? (bytes < 0 ? '-' : '+') : '';

  if (bytes === 0) return `${sign}0B`;

  const k = 1024;
  const dm = 2;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));

  return `${sign}${parseFloat(Math.abs(bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

module.exports = formatBytes;
