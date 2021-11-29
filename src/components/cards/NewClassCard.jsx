import React from 'react';
import { getConfig } from '@edx/frontend-platform';

import {
  Card, useToggle,
} from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import CreateClassroomDialog from '../CreateClassroomDialog';

const NewClassCard = (props) => {
  const [isOpen, open, close] = useToggle(false);

  const onCreatedClassroom = (newClassroomUUID) => {
    const newURL = `${getConfig().CLASSROOM_MFE_URL}/${newClassroomUUID}/`;
    window.location.href = newURL;
  };
  return (
    <Card className="new-class-card dashboard-card">
      <Card.Body className="new-class-card-body">
        <CreateClassroomDialog isOpen={isOpen} close={close} onSuccess={onCreatedClassroom} />
        <div>
          <div className="icon">
            <FontAwesomeIcon icon={props.icon} size="5x" onClick={open} />
          </div>
          <h4>{props.text}</h4>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewClassCard;

NewClassCard.propTypes = {
  text: PropTypes.string.isRequired,
  /* eslint-disable react/forbid-prop-types */
  icon: PropTypes.any.isRequired,
  /* eslint-enable react/forbid-prop-types */
};
