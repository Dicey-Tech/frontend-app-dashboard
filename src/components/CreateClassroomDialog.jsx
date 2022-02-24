import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import {
  ActionRow, Form, ModalDialog, Button,
} from '@edx/paragon';
import UserService from '../app/services/UserService';
import ClassroomApiService from '../app/services/ClassroomApiService';

const CreateClassroomDialog = ({ isOpen, close, onSuccess }) => {
  const enterpriseUuid = UserService.getUserEnterpriseAdminUuid();
  const titleRef = useRef();
  const [canSubmit, setCanSubmit] = useState(false);

  const onClassroomCreate = async () => {
    try {
      const title = titleRef.current.value;
      const result = await ClassroomApiService.createNewClassroom({ title, enterpriseUuid });
      close();
      /* the result contains the UUID of the new classroom, Pass this back */
      const newClassroomUUID = result.data.uuid;
      onSuccess(newClassroomUUID);
    } catch {
      alert('an error occured while creating the classroom.');
    }
  };

  const onFormChange = () => {
    setCanSubmit(titleRef.current.value !== '');
  };

  return (
    <ModalDialog isOpen={isOpen} onClose={close} hasCloseButton={false} title="Create Classroom" size="md" className="create-classroom-dialog">
      <ModalDialog.Header />
      <ModalDialog.Body>
        <Form.Group>
          <Form.Control placeholder="Enter a name for the Classroom" ref={titleRef} onChange={onFormChange} />
        </Form.Group>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <ActionRow className="action-row">
          <ModalDialog.CloseButton variant="tertiary">
            Cancel
          </ModalDialog.CloseButton>
          <Button variant="primary" onClick={onClassroomCreate} disabled={!canSubmit}>
            OK
          </Button>
        </ActionRow>
      </ModalDialog.Footer>

    </ModalDialog>

  );
};

export default CreateClassroomDialog;

CreateClassroomDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
