import React, { useState, useEffect } from 'react';

import { getConfig } from '@edx/frontend-platform'
import { Card } from '@edx/paragon';

import DefaultImage from '../assets/defaultcourse.png';

const DEFAULT_COURSE_IMAGE_NAME = "images_course_image.jpg";
const LMS_BASE_URL = getConfig().LMS_BASE_URL;

export const DashboardCard = ({original}) => {
  const [imgSrc, setImgSrc] = useState(original.media.image.small);
  const {name, short_description, course_id} = original;

  useEffect(() => {
    if(imgSrc.includes(DEFAULT_COURSE_IMAGE_NAME)) {
      setImgSrc(DefaultImage);
    };
  }, [imgSrc]);

  return (
      <Card isClickable>
        <a href={`${LMS_BASE_URL}/courses/${course_id}/course`}>
          <Card.ImageCap 
            variant="top" 
            src={imgSrc} 
            className="card-image" 
            srcAlt="Project Image" />
          <Card.Header
            title={name}
          />
          <Card.Section className="text-wrap muted-link">
            <p>{short_description}</p>
          </Card.Section>
        </a>
      </Card>
  );
}

export default DashboardCard;