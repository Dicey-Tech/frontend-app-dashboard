import 'babel-polyfill';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
  getConfig,
} from '@edx/frontend-platform';

import { ErrorPage } from '@edx/frontend-platform/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import appMessages from './i18n';

import TeacherDashboard from './pages/TeacherDashboard';
import ClassDashboard from './pages/ClassDashboard';

import store from './data/store';
import './index.scss';

const App = () => (
  <IntlProvider lang="en">
    <Provider store={store}>
      <Header />
      <Router>
        <Switch>
          <Route exact path={getConfig().PUBLIC_PATH} component={TeacherDashboard} />
          <Route exact path="/class/:classId" component={ClassDashboard} />
        </Switch>
      </Router>
      <Footer />
    </Provider>
  </IntlProvider>
);

subscribe(APP_READY, () => {
  // store.dispatch(fetchClassesTeaching()); /* we get this just the once when the app loads */
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
});
