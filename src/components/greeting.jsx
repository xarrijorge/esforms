import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo_cropped.png';

// eslint-disable-next-line react/prop-types
function Greeting({ user }) {
  return (
    <div className="greetContainer">
      <img src={logo} alt="" className="greetImage" />
      <h2 className="greeting">
        Welcome,
        {user}
        . Please Fill out the details below
      </h2>
      <h5 className="greetingLink">
        or
        <Link to="/formselection"> select a different form</Link>
      </h5>
    </div>
  );
}

export default Greeting;
