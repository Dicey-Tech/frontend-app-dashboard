import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
  mergeConfig,
} from '@edx/frontend-platform';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import { PAGE_NOT_FOUND } from './data/constants';
import configureStore from './data/configureStore';
import { DashboardPage } from './dashboard';
import { NotFoundPage } from './common-components';
import appMessages from './i18n';

import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <Header />
      <Route exact path="/" component={DashboardPage} />
      <Route path={PAGE_NOT_FOUND} component={NotFoundPage} />
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
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
        PORTFOLIO_URL: process.env.PORTFOLIO_URL,
      }, 'App loadConfig override handler');
    },
  },

});
