import {
  call, put, takeEvery, takeLatest,
} from 'redux-saga/effects';

import {
  GET_COURSE_DATA,
  getCourseDataBegin,
  getCourseDataFailure,
  getCourseDataSuccess,
  GET_ENROLLMENT_DATA,
  getEnrollmentDataBegin,
  getEnrollmentDataFailure,
  getEnrollmentDataSuccess,
} from './actions';

import { fetcLearnerhEnrollments, fetchCourseOverview } from './service';

export function* getEnrollmentData() {
  try {
    yield put(getEnrollmentDataBegin());
    const data = yield call(fetcLearnerhEnrollments);
    yield put(getEnrollmentDataSuccess(data));
  } catch (e) {
    yield put(getEnrollmentDataFailure());
  }
}

export function* getCourseData(action) {
  try {
    yield put(getCourseDataBegin());
    const data = yield call(fetchCourseOverview, action.payload.data);

    const course = {
      courseId: data.id,
      name: data.name,
      description: data.short_description,
      media: data.media.image.small,
      start: Date.parse(data.start),
    };

    yield put(getCourseDataSuccess(course));
  } catch (e) {
    yield put(getCourseDataFailure(e));
  }
}

export default function* saga() {
  yield takeLatest(GET_ENROLLMENT_DATA.BASE, getEnrollmentData);
  yield takeEvery(GET_COURSE_DATA.BASE, getCourseData);
}
