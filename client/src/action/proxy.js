import React from 'react';

function Proxy({ isLoggedIn, component: Component, message }) {
  if (isLoggedIn) {
    return <Component />;
  } else {
    return <p>{message}</p>;
  }
}

export default Proxy;