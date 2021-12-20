import React from 'react';
import {
  Card,
} from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';

const ExploreCard = (props) => (
  <Card className="dashboard-card explore-card">
    <Card.Body className="explore-card-body">
      <div>
        <div className="icon">
          <Card.Link href={getConfig().EXPLORE_COURSES_URL}>
            <span className="fa-stack fa-2x ">
              <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" />
              <FontAwesomeIcon icon={props.icon} inverse className="fa-stack-1x" />
            </span>
          </Card.Link>
        </div>
        <h4>{props.text}</h4>
      </div>
    </Card.Body>
  </Card>
);

export default ExploreCard;

ExploreCard.propTypes = {
  text: PropTypes.string.isRequired,
  /* eslint-disable react/forbid-prop-types */
  icon: PropTypes.any.isRequired,
  /* eslint-enable react/forbid-prop-types */
};
