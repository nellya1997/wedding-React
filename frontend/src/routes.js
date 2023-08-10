const apiPath = '/api';

export default {
  add: [apiPath, 'guest-add'].join('/'),
  all: [apiPath, 'guest-all'].join('/'),
  delete: [apiPath, 'guest-delete/'].join('/'),
};
