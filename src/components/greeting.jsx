import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo_cropped.png';

// eslint-disable-next-line react/prop-types
function Greeting({ user, text = 'Please Fill Out the details below' }) {
    return (
        <div className='greetContainer'>
            <img src={logo} alt='' className='greetImage' />
            <h2 className='greeting'>
                Welcome,
                {user}. {text}
            </h2>
            {location.href.includes('reject') ? null : (
                <h5 className='greetingLink'>
                    or
                    <Link to='/formselection'> select a different form</Link>
                </h5>
            )}
        </div>
    );
}

export default Greeting;
