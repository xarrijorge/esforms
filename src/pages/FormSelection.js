import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'
import LogoutIcon from '@mui/icons-material/Logout'
import { Button } from '@mui/material'

export const FormSelection = () => {
    let user = null
    if (JSON.parse(localStorage.getItem('userdata')) !== null) {
        const { 'First Name': username } = JSON.parse(
            localStorage.getItem('userdata')
        )
        user = username
    }

    const id = process.env.REACT_APP_CLIENT_ID

    const navigate = useNavigate()
    const logout = () => {
        window.localStorage.clear()
        navigate('/')
    }

    if (user) {
        return (
            <div className='formPage'>
                <h2>
                    {' '}
                    Hello, {user}. Which Request do you want to make today?
                </h2>
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
                    <span className='outtext'>Not {user}?</span>
                    <GoogleLogout
                        render={(renderProps) => (
                            <Button
                                variant='contained'
                                size='large'
                                onClick={renderProps.onClick}
                                endIcon={<LogoutIcon />}>
                                LOGOUT
                            </Button>
                        )}
                        clientId={id}
                        onLogoutSuccess={logout}
                    />
                </footer>
            </div>
        )
    }

    return (
        <div>
            Please <Link to='/'>LOGIN</Link> to view forms
        </div>
    )
}
