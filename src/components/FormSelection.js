import React from 'react'
import { Link } from 'react-router-dom'

export const FormSelection = () => {
    const { 'First Name': user } = JSON.parse(localStorage.getItem('userdata'))
    return (
        <div className='formPage'>
            <h2> Hello, {user}. Which Request to you want to make today?</h2>
            <div className='cardBox'>
                <a
                    className='formCard perdiem'
                    href='https://esrequestform.netlify.app/'>
                    Per Diem Request
                </a>
                <a
                    className='formCard pettycash'
                    href='https://espettycash.netlify.app/'>
                    Petty Cash Request
                </a>
                <a
                    className='formCard vehicle'
                    href='https://esvehicle.netlify.app/'>
                    Vehicle Request
                </a>
            </div>
            <footer className='formFooter'>
                Not {user}? Change details <Link to='/'>HERE</Link>
            </footer>
        </div>
    )
}
