import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { Card } from '@edx/paragon';

import DefaultImage from '../assets/defaultcourse.png';

const DEFAULT_COURSE_IMAGE_NAME = 'images_course_image.jpg';
const { LMS_BASE_URL } = getConfig();

export const DashboardCard = ({ original }) => {
  const [imgSrc, setImgSrc] = useState(original.media);
  const { name, description, courseId } = original;

  useEffect(() => {
    if (imgSrc.includes(DEFAULT_COURSE_IMAGE_NAME)) {
      setImgSrc(DefaultImage);
    }
  }, [imgSrc]);

  return (
    <Card isClickable>
      <a href={`${LMS_BASE_URL}/courses/${courseId}/course`}>
        <Card.ImageCap
          variant="top"
          src={imgSrc}
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
  original: {},
};

DashboardCard.propTypes = {
  original: PropTypes.shape,
};

export default DashboardCard;
