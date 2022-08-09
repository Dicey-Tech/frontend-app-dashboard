import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { injectIntl, IntlProvider, configure } from '@edx/frontend-platform/i18n';

import DashboardPage from '../Dashboard';

jest.mock('@edx/frontend-platform/auth');

const IntlDashboardPage = injectIntl(DashboardPage);
const mockStore = configureStore();

describe('DashboardPage', () => {
  let props = {};
  let store = {};

  const reduxWrapper = children => (
    <IntlProvider locale="en">
      <Provider store={store}>{children}</Provider>
    </IntlProvider>
  );

  beforeEach(() => {
    store = mockStore();
    configure({
      loggingService: { logError: jest.fn() },
      config: {
        ENVIRONMENT: 'production',
        LANGUAGE_PREFERENCE_COOKIE_NAME: 'yum',
      },
      messages: { 'es-419': {}, de: {}, 'en-us': {} },
    });
    props = {
      getEnrollmentList: jest.fn(),
      getCoursesOverview: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a course section component by default', () => {
    store = mockStore({
      enrollmentList: ['course-v1:DiceyTech+PRJX001+PROJECT_X'],
      coursesOverview: [
        {
          name: 'Project X',
          description: 'Description of Project X',
          courseId: 'course-v1:DiceyTech+PRJX001+PROJECT_X',
          media: 'images_course_image.jpg',
        },
      ],
      enrollmentCallSuccess: true,
    });

    const dashboardPage = mount(reduxWrapper(<IntlDashboardPage {...props} />));
    expect(dashboardPage.find('DashboardPage').exists()).toEqual(true);
    expect(dashboardPage.find('CoursesSection').exists()).toEqual(true);
  });
});
