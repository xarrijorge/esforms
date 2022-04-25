import React from 'react'
import { Link } from 'react-router-dom'

export const FormSelection = () => {
    const { 'First Name': user } = JSON.parse(localStorage.getItem('userdata'))
    return (
        <div className='formPage'>
            <h2> Hello, {user}. Which Request do you want to make today?</h2>
            <div className='cardBox'>
                <Link to='/perdiem' className='formCard perdiem'>
                    Per Diem
                </Link>

                <Link to='/pettycash' className='formCard pettycash'>
                    Petty Cash
                </Link>
                <Link to='/vehicle' className='formCard vehicle'>
                    Vehicle
                </Link>
            </div>
            <footer className='formFooter'>
                Not {user}? Change details <Link to='/'>HERE</Link>
            </footer>
        </div>
    )
}
