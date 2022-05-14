import React from 'react'
import GoogleLogin from 'react-google-login'
import GoogleIcon from '@mui/icons-material/Google'
import { Button, CircularProgress } from '@mui/material'
import logo from '../logo.png'

const Home = ({ res, id, loading }) => (
    <div className='homepage'>
        <img src={logo} alt='' className='homeImage' />
        <GoogleLogin
            render={(renderProps) => (
                <Button
                    variant='contained'
                    size='large'
                    className='homebutton'
                    onClick={renderProps.onClick}
                    endIcon={<GoogleIcon />}>
                    {loading ? <CircularProgress color='inherit' /> : 'LOGIN'}
                </Button>
            )}
            clientId={id}
            onSuccess={res}
            onFailure={res}
            cookiePolicy={'single_host_origin'}
        />
    </div>
)

export default Home
