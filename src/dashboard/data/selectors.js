import { createSelector } from 'reselect';

export const storeName = 'dashboardPage';

export const dashboardPageSelector = state => ({ ...state[storeName] });

export const enrollmentListSelector = createSelector(
  dashboardPageSelector,
  dashboard => dashboard.enrollmentList,
);

export const enrollmentCallSuccessSelector = createSelector(
  dashboardPageSelector,
  dashboard => dashboard.enrollmentCallSuccess,
);

export const coursesOverviewSelector = createSelector(
  dashboardPageSelector,
  dashboard => dashboard.coursesOverview,
);
