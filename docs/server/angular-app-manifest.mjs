
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
    'index.csr.html': {size: 547, hash: 'd40fcbdf96a1aebe7065d73dddbaa65e624bfa7fb9e24f3ae0f397f59279b80f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1060, hash: 'c86a30e4a6f214f21d6ef39e87bfe1e98222cc64b4b190591b63dbd801ac6d21', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 20882, hash: 'd79aeed0017fde7c0ebb5cbc934d9762109915ee20d85f03241985787789ffbd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
