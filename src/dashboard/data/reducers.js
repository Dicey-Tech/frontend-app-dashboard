import { GET_COURSE_DATA, GET_ENROLLMENT_DATA } from './actions';
import {
  DEFAULT_STATE, PENDING_STATE, COMPLETE_STATE, FAILURE_STATE,
} from '../../data/constants';

export const defaultState = {
    enrollmentList: [],
    coursesOverview: [],
    formRenderState: DEFAULT_STATE,
    success: false,
    showError: false,
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ENROLLMENT_DATA.BEGIN:
            return {
                ...state,
                formRenderState: PENDING_STATE,
            };
        case GET_ENROLLMENT_DATA.SUCCESS:
            return {
                ...state,
                enrollmentList: action.payload.data,
                formRenderState: COMPLETE_STATE,
            };
        case GET_ENROLLMENT_DATA.FAILURE:
            return {
                ...state,
                formRenderState: FAILURE_STATE,
            };
        case GET_COURSE_DATA.BEGIN:
            return {
                ...state,
                formRenderState: PENDING_STATE,
            };
        case GET_COURSE_DATA.SUCCESS:
            return {
                ...state,
                coursesOverview: [
                    ...state.coursesOverview, 
                    action.payload.data,
                ],
                formRenderState: COMPLETE_STATE,
            };
        case GET_COURSE_DATA.FAILURE:
            return {
                ...state,
                formRenderState: FAILURE_STATE,
            };
        default:
            return state;
    }
};

export default reducer;