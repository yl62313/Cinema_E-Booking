import React from 'react';
import PropTypes from 'prop-types';

function Proxy(props) {
  if (props.isLoggedIn) {
    return props.component;
  } else {
    return <div>{props.message}</div>;
  }
}

Proxy.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.element.isRequired,
  message: PropTypes.string.isRequired,
};

export default Proxy;
