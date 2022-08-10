import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { Card } from '@edx/paragon';

import DefaultImage from '../assets/defaultcourse.png';

const DEFAULT_COURSE_IMAGE_NAME = 'images_course_image.jpg';
const { LMS_BASE_URL } = getConfig();

export const DashboardCard = ({ original }) => {
  const {
    name, description, courseId, media,
  } = original;

  const cardImage = media.includes(DEFAULT_COURSE_IMAGE_NAME) ? (
    DefaultImage
  ) : media;

  return (
    <Card isClickable>
      <a href={`${LMS_BASE_URL}/courses/${courseId}/course`}>
        <Card.ImageCap
          variant="top"
          src={cardImage}
          className="card-image"
          srcAlt="Project Image"
        />
        <Card.Header
          title={name}
        />
        <Card.Section className="text-wrap muted-link">
          <p>{description}</p>
        </Card.Section>
      </a>
    </Card>
  );
};

DashboardCard.defaultProps = {
  original: {
    name: 'Project Title',
    courseId: 'CourseID',
    media: '',
  },
};

DashboardCard.propTypes = {
  original: PropTypes.shape({
    name: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    description: PropTypes.string,
    media: PropTypes.string.isRequired,
  }),
};

export default DashboardCard;
