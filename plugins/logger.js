/* eslint no-console: 0 */

const COLOR = {
  log: 'transparent',
  warn: '#E48000',
  error: '#D60C00',
  table: '#0090FA',
  time: '#590073',
  check: '#95B46A'
};
const DEF_TYPE = 'log';
const DEF_NAME = '';

const deleteLinks = (args, type) => {
  const newArgs = {};

  Object.keys(args).forEach(ii => {
    try {
      newArgs[ii] = JSON.parse(JSON.stringify(args[ii]));
    } catch (e) {
      newArgs[ii] = args[ii];
    }
  });

  if (type === 'table') {
    return newArgs[0];
  }
  return newArgs;
};

const getStyles = (type = DEF_TYPE, textColor = 'white') => `color: ${textColor}; background-color: ${COLOR[type]}`;

const consoleLogging = (logName = DEF_NAME, args = ['WITHOUT ARGS'], type = DEF_TYPE) => {
  const displayArgs = deleteLinks(args, type);

  console.group(`%c ${logName} `, getStyles(type));
  console[type](displayArgs);
  console.groupEnd();
};

export const log = (logName, ...args) => {
  consoleLogging(logName, args, 'log');
};

export const warn = (logName, ...args) => {
  consoleLogging(logName, args, 'warn');
};

export const error = (logName, ...args) => {
  consoleLogging(logName, args, 'error');
};

export const table = (logName, ...args) => {
  consoleLogging(logName, args, 'table');
};

export const params = (logName = DEF_NAME, obj) => {
  if (typeof obj !== 'object') {
    error('ERROR! You must pass the object to the second argument!', { argType: typeof obj, arg: obj, logName });
    return;
  }

  const newObj = {};
  const modifiedLogName = `CHECK ${logName} PARAMS`;

  Object.keys(obj).forEach(ii => {
    if (obj[ii] && ii !== 'updater' && ii !== '_reactInternalFiber' && ii !== '_reactInternalInstance') {
      newObj[ii] = obj[ii];
    }
  });

  consoleLogging(modifiedLogName, newObj, 'warn');
};

export const props = (logName = DEF_NAME, ...args) => {
  const newArgs = [];
  const modifiedLogName = `CHECK ${logName} PROPS`;

  Object.keys(args).forEach(ii => {
    if (args[ii].props) {
      newArgs.push(args[ii].props);
    }
  });

  consoleLogging(modifiedLogName, newArgs, 'warn');
};

export const check = (name = DEF_NAME) => {
  console.log(`%c CHECK -> `, getStyles('check'), name);
};

export const time = (logName = DEF_NAME, fn) => {
  if (typeof fn !== 'function') {
    error('ERROR! You must pass the function to the second argument!', { argType: typeof fn, arg: fn, logName });
    return;
  }

  const timeName = `Time spent on "${logName}", is`;
  console.group('%c CHECKING THE SPENT TIME ', getStyles('time'));
  console.time(timeName);
  fn();
  console.timeEnd(timeName);
  console.groupEnd();
};

export const profile = (logName = DEF_NAME, fn) => {
  if (typeof fn !== 'function') {
    error('ERROR! You must pass the function to the second argument!', { argType: typeof fn, arg: fn, logName });
    return;
  }

  console.group('%c PROFILE ', getStyles('time'));
  console.profile(logName);
  fn();
  console.profileEnd();
  console.groupEnd();
};
