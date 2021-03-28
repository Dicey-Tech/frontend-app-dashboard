import React from 'react';
import {
  Card,
} from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

export default function ExploreCard(props) {
  return (
    <Card className="exploreCard">
      <Card.Body className="exploreCardBody">
        <Card.Link href="">
          <div className="exploreSearchIcon">
            <FontAwesomeIcon icon={props.icon} inverse size="2x" />
          </div>
        </Card.Link>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

ExploreCard.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.objectOf(PropTypes.object()).isRequired,
};
