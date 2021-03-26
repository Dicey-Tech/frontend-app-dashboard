import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@edx/paragon';
import CourseCard from './cards/CourseCard';
import SectionTitle from './SectionTitle';

export default function CardSection({
  sectionTitle, exploreCard, showExploreCardAlways, courses, showSpinner,
}) {
  const cards = [];
  if (exploreCard) {
    if (showExploreCardAlways || !courses || courses.length === 0) {
      cards.push(React.cloneElement(exploreCard, { key: 'EXPLORE_CARD' }));
    }
  }
  courses.forEach(element => {
    // TODO for bookmarks we have to go to /courses/<course>/jump_to/<usage_id>
    cards.push(
      <div className="col" key={element.classId}>
        <CourseCard
          url={`/class/${element.classId}`}
          media={element.media}
          name={element.name}
          level={element.start}
          description={element.description}
          studentCount={element.studentCount}
        />
      </div>,
    );
  });
  return (
    <>
      <SectionTitle>
        <h4>{sectionTitle}</h4>
      </SectionTitle>
      <div className="container">
        <div className={showSpinner ? 'd-flex  flex-row justify-content-centre' : 'd-flex flex-row justify-content-start'}>
          {showSpinner && <div className="dicey-react-loading-skeleton"><Spinner className="spinner" animation="border" /></div>}
          {!showSpinner && cards}
        </div>
      </div>
    </>
  );
}

CardSection.defaultProps = {
  exploreCard: null,
  showExploreCardAlways: false,
  courses: [],
  showSpinner: false,
};
CardSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  exploreCard: PropTypes.element,
  showExploreCardAlways: PropTypes.bool,
  courses: PropTypes.arrayOf(PropTypes.object),
  showSpinner: PropTypes.bool,
};
