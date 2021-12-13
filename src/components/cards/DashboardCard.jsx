import React from 'react';
import {
  Card,
  Button,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import StudentCount from '../StudentCount';

export default function DashboardCard(props) {
  const onImageError = (e) => {
    e.currentTarget.src = '/public/images/defaultcourse.png';
  };
  return (
    <Card className="dashboard-card">
      <Card.Img variant="top" src={props.media} className="card-image" onError={onImageError} />
      <Card.Body className="pt-2 pl-4 pr-4 pb-2 position-relative">
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className={`row align-items-center ${props.actionBtnText ? 'justify-content-between' : 'justify-content-end'}`}>
          {props.actionBtnText && (
            <div className="col col-3">
              <Button variant="primary" href={props.url}>{props.actionBtnText}</Button>
            </div>
          )}
          {props.studentCount
            && <StudentCount className="col col-3" studentCount={props.studentCount} />}
        </div>
      </Card.Footer>
    </Card>
  );
}

DashboardCard.defaultProps = {
  description: null,
  studentCount: null,
  actionBtnText: null,
};

DashboardCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
  description: PropTypes.string,
  studentCount: PropTypes.number,
  actionBtnText: PropTypes.string,
};
