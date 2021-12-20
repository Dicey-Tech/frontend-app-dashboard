import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
  mergeConfig,
} from '@edx/frontend-platform';
import { messages as headerMessages } from '@edx/frontend-component-header';
import { messages as footerMessages } from '@edx/frontend-component-footer';
import { ErrorPage } from '@edx/frontend-platform/react';
import React from 'react';
import ReactDOM from 'react-dom';
import appMessages from './i18n';
import './index.scss';
import App from './app/index';

subscribe(APP_READY, () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        CLASSROOM_BASE_URL: process.env.CLASSROOM_BASE_URL,
        GRADEBOOK_URL: process.env.GRADEBOOK_URL,
        CLASSROOM_MFE_URL: process.env.CLASSROOM_MFE_URL,
        EXPLORE_COURSES_URL: process.env.EXPLORE_COURSES_URL,
      }, 'App loadConfig override handler');
    },
  },

});
