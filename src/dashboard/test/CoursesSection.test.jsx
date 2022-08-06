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
          short_description: 'Description of Project X',
          course_id: 'course-v1:DiceyTech+PRJX001+PROJECT_X',
          media: {
            image: {
              small: 'images_course_image.jpg',
            },
          },
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
