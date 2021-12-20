import React from 'react';
import { AppProvider } from '@edx/frontend-platform/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import TeacherDashboard from '../pages/TeacherDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import UserService from './services/UserService';

const App = () => (
  <IntlProvider locale="en">
    <AppProvider>
      <Header />
      {
        UserService.isUserAStudent() ? <StudentDashboard />
          : <TeacherDashboard />
      }
      <Footer />
    </AppProvider>
  </IntlProvider>

);

export default App;
