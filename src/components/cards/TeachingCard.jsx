import React, { useState } from 'react';
import {
  Card,
  Button,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import DefaultImage from '../../assets/defaultcourse.png';

export default function TeachingCard(props) {
  const [imgSrc, setImgSrc] = useState(props.media);

  const onImageError = () => {
    setImgSrc(DefaultImage);
  };

  return (
    <Card className="dashboard-card">
      <Card.Img variant="top" src={imgSrc} className="card-image" onError={onImageError} />
      <Card.Body className="pt-2 pl-4 pr-4 pb-2 position-relative text-truncate">
        <Card.Title>{props.name}</Card.Title>
        <Card.Text className="text-wrap">
          {props.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="row justify-content-between">
          <div className=" align-self-start ">
            <Button variant="primary" href={props.gradebookUrl}>View Grades</Button>
          </div>
          <div className="align-self-end">
            <Button variant="primary" href={props.courseUrl}>View Course</Button>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

TeachingCard.defaultProps = {
  description: 'no description available',
};

TeachingCard.propTypes = {
  name: PropTypes.string.isRequired,
  gradebookUrl: PropTypes.string.isRequired,
  courseUrl: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
  description: PropTypes.string,
};
