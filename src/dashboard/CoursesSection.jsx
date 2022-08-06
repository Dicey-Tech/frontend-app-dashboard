import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, DataTable, CardView, TableFooter,
} from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';

import { SectionTitle, DashboardCard, DiceySpinner } from '../common-components';

const INITIAL_STATE = {
  pageSize: 6,
  pageIndex: 0,
};

const COLUMNS = [
  {
    Header: 'Title',
    accessor: 'name',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
];

const COLUMN_SIZES = { xs: 12, lg: 6, xl: 2 };

const CoursesSection = ({ courses, isReady, hasEnrollments }) => {
  /* eslint-disable no-nested-ternary */
  const courseCards = !isReady ? <DiceySpinner />
    : !hasEnrollments ? (
      <div key="no-classrooms" className="col align-self-center d-inline">
        <h3>You are not enrolled in any courses</h3>
        <p>Getting started with {getConfig().SITE_NAME} is easy. Simply find a project from the catalog</p>
      </div>
    )
      : (
        <DataTable
          isPaginated
          isSortable
          data={courses}
          itemCount={courses.length}
          initialState={INITIAL_STATE}
          columns={COLUMNS}
        >
          <CardView CardComponent={DashboardCard} columnSizes={COLUMN_SIZES} />
          <TableFooter />
        </DataTable>
      );

  return (
    <>
      <Container className="section-container">
        <SectionTitle>My Projects</SectionTitle>
        {courseCards}
      </Container>
    </>
  );
};

CoursesSection.propTypes = {
  isReady: PropTypes.bool,
  hasEnrollments: PropTypes.bool,
  courses: PropTypes.arrayOf(PropTypes.object),
};

CoursesSection.defaultProps = {
  isReady: false,
  hasEnrollments: false,
  courses: [],
};

export default CoursesSection;
