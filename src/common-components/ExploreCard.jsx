import React from 'react';

import { Card } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function ExploreCard() {
  return (
    <a href={getConfig().EXPLORE_COURSES_URL}>
      <Card isClickable>
        <div className="explore-card">
          <Card.Section className="text-center">
            <span className="fa-stack fa-3x ">
              <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" />
              <FontAwesomeIcon icon={faSearch} inverse className="fa-stack-1x" />
            </span>
            <h3>Discover Projects</h3>
          </Card.Section>
        </div>
      </Card>
    </a>
  );
}
