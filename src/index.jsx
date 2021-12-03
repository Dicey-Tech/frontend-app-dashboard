import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
  mergeConfig,
} from '@edx/frontend-platform';

import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import React from 'react';
import ReactDOM from 'react-dom';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import appMessages from './i18n';

import TeacherDashboard from './pages/TeacherDashboard';

import './index.scss';

const App = () => (
  <IntlProvider locale="en">
    <AppProvider>
      <Header />
      <TeacherDashboard />
      <Footer />
    </AppProvider>
  </IntlProvider>
);

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
      }, 'App loadConfig override handler');
    },
  },

});
