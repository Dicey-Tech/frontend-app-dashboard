import React from 'react';
import PropType from 'prop-types';
import { Row, Col } from '@edx/paragon';

export default function SectionTitle(props) {
  return (
    <Row className="align-items-center section-title">
      <Col>
        <h2>{props.children}</h2>
      </Col>
    </Row>
  );
}

SectionTitle.propTypes = {
  children: PropType.node.isRequired,
};
