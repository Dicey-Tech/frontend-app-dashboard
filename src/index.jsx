import 'babel-polyfill';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { getConfig } from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { IntlProvider} from '@edx/frontend-platform/i18n';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import appMessages from './i18n';

import TeacherDashboard from './pages/TeacherDashboard'
import ClassDashboard from './pages/ClassDashboard'

import './index.scss';

const App = () => (
    <AppProvider>
        <Header/>
        <Router>
           <Switch>
              <Route exact path={getConfig().PUBLIC_PATH} component={TeacherDashboard}/>
              <Route exact path={'/class/:classId'} component={ClassDashboard}/>
           </Switch>
        </Router>
        <Footer/>
    </AppProvider>
)

subscribe(APP_READY, () => {
  ReactDOM.render(<App/>, document.getElementById('root'),
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
});
