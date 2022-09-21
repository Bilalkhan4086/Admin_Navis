import React from 'react';
import PropTypes from 'prop-types';
import GeneralSettings from './GeneralSettings';

const General = ({ className, ...rest }) => {
  const user = {};

  return <GeneralSettings user={user} />;
};

General.propTypes = {
  className: PropTypes.string,
};

export default General;
