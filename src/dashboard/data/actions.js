import { AsyncActionType } from '../../data/utils';

export const GET_COURSE_DATA = new AsyncActionType('COURSE_DESCRIPTION', 'GET_COURSE_DATA');
export const GET_ENROLLMENT_DATA = new AsyncActionType('ENROLLMENT_DESCRIPTION', 'GET_ENROLLMENT_DATA');

// get course data from platform
export const getCourseData = (data) => ({
    type: GET_COURSE_DATA.BASE,
    payload: { data }
});

export const getCourseDataBegin = () => ({
    type: GET_COURSE_DATA.BEGIN,
});

export const getCourseDataSuccess = (data) => ({
    type: GET_COURSE_DATA.SUCCESS,
    payload: { data },
});

export const getCourseDataFailure = (error) => ({
    type: GET_COURSE_DATA.FAILURE,
    payload: { error },
});

// get enrollment data from platform
export const getEnrollmentData = () => ({
    type: GET_ENROLLMENT_DATA.BASE,
});

export const getEnrollmentDataBegin = () => ({
    type: GET_ENROLLMENT_DATA.BEGIN,
});

export const getEnrollmentDataSuccess = (data) => ({
    type: GET_ENROLLMENT_DATA.SUCCESS,
    payload: { data },
});

export const getEnrollmentDataFailure = () => ({
    type: GET_ENROLLMENT_DATA.FAILURE,
});