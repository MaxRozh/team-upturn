/* eslint-disable @typescript-eslint/no-var-requires, global-require */

const { execSync } = require('child_process');

require('dotenv').config({ path: '.env' });

const colorfulConsole = require('../utils/colorfulConsole');

colorfulConsole({ message: 'Start building project', hasStartLine: true });

execSync('yarn build:prod', { stdio: 'inherit' });

colorfulConsole({ message: '[success] Build project', hasEndLine: true });
