import { all } from 'redux-saga/effects';

import { saga as dashboardSaga } from '../dashboard';

export default function* rootSaga() {
  yield all([
    dashboardSaga(),
  ]);
}
