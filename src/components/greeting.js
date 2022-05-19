import React from 'react'
import { Link } from 'react-router-dom'

const Greeting = ({ user }) => (
    <>
        <h2 className='greeting'>
            Welcome, {user}. Please Fill out the details below
        </h2>
        <h5 className='greetingLink'>
            or <Link to='/formselection'> select a different form</Link>
        </h5>
    </>
)

export default Greeting
