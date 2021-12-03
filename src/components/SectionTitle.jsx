import React from 'react';
import PropType from 'prop-types';

export default function SectionTitle(props) {
  return (
    <h2 className="section-title">{props.children}</h2>
  );
}

SectionTitle.propTypes = {
  children: PropType.node.isRequired,
};
