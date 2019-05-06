import Raven from 'raven-js';

function init() {
  Raven.config('https://86258103154b44559c8b2834ce5dc4fa@sentry.io/1328037', {
    release: '1-0-0',
    environment: 'development-test',
  }).install();
}

function log(error) {
  console.log(error);
  Raven.captureException(error);
}

export default {
  init,
  log,
};
