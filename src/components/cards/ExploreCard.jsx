import React from 'react';
import {
  Card,
} from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const ExploreCard = (props) => (
  <Card className="exploreCard h-100">
    <Card.Body className="exploreCardBody position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="exploreSearchIcon ">
          <FontAwesomeIcon icon={props.icon} size="5x" />
        </div>
        <div>{props.text}</div>
      </div>
    </Card.Body>
  </Card>
);

export default ExploreCard;

ExploreCard.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.objectOf(PropTypes.object).isRequired,
};
