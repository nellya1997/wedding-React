const apiPath = navigator.userAgent === 'ReactSnap' ? 'http://0.0.0.0:3002/api' : '/api';

export default {
  add: [apiPath, 'guest-add'].join('/'),
  all: [apiPath, 'guest-all'].join('/'),
  delete: [apiPath, 'guest-delete/'].join('/'),
};
