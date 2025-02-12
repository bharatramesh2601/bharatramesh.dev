
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/bharatramesh.dev/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/C:/Program Files/Git/bharatramesh.dev"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 549, hash: '347e006964394eb1f4502a12ddda5db513cb0daade5d0536827bbb504df43876', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1062, hash: 'be5a54e59f59c0e09c8213597e36386b97f53e0c78754039bc9e59bbfbad886a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 20884, hash: 'd8d2fdb861aefdec62d5c3b1e229d619d651bc60e596890d5a6d07ee4773fa79', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
