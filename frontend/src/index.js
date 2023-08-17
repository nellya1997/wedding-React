import { hydrateRoot, createRoot } from 'react-dom/client';
import './scss/style.scss';
import crawlerUserAgents from './crawlerUserAgents.js';
import init from './init.jsx';

const app = async () => {
  const container = document.getElementById('root');

  if (container.hasChildNodes() && crawlerUserAgents.includes(window.navigator.userAgent)) {
    hydrateRoot(container, await init());
  } else {
    const root = createRoot(container);
    root.render(await init());
  }
};

app();
