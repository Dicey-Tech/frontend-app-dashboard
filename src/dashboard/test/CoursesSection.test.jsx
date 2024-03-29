import React from 'react';
import renderer from 'react-test-renderer';

import CoursesSection from '../CoursesSection';

describe('<CoursesSection />', () => {
  let props = {};

  beforeEach(() => {
    props = {
      isReady: true,
      hasEnrollments: true,
      courses: [
        {
          name: 'Project X',
          description: 'Description of Project X',
          courseId: 'course-v1:DiceyTech+PRJX001+PROJECT_X',
          media: 'images_course_image.jpg',
        },
        {
          name: 'Project Y',
          description: 'Description of Project Y',
          courseId: 'course-v1:DiceyTech+PRJY001+PROJECT_Y',
          media: 'course_image_Y.jpg',
        },
        {
          name: 'Project Z',
          description: 'Description of Project Z',
          courseId: 'course-v1:DiceyTech+PRJZ001+PROJECT_Z',
          media: 'course_image_Z.jpg',
        },
      ],
    };
  });

  it('should render course section if a list of courses is provided', () => {
    const tree = renderer.create(
      <CoursesSection {...props} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render a message if the user is not enrolled in any course', () => {
    props = {
      isReady: true,
      hasEnrollments: false,
      courses: [],
    };

    const tree = renderer.create(
      <CoursesSection {...props} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
