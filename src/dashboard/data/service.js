import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export async function fetcLearnerhEnrollments() {
  const requestConfig = {
    headers: { 'Content-Type': 'application/json' },
  };

  const { data } = await getAuthenticatedHttpClient()
    .get(
      `${getConfig().LMS_BASE_URL}/api/enrollment/v1/enrollment`,
      requestConfig,
    )
    .catch((e) => {
      throw (e);
    });

  return data;
}

export async function fetchCourseOverview(enrollments) {
  const requestConfig = {
    headers: { 'Content-Type': 'application/json' },
  };
  const courses = [];

  /* eslint-disable no-restricted-syntax */
  /* eslint-disable no-await-in-loop */
  for (const enrollment of enrollments) {
    const { data } = await getAuthenticatedHttpClient()
      .get(
        `${getConfig().LMS_BASE_URL}/api/courses/v1/courses/${enrollment.course_id}`,
        requestConfig,
      )
      .catch((e) => {
        throw (e);
      });

    courses.push(data);
  }

  return courses.reverse();
}
