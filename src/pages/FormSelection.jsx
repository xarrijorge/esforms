import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

function FormSelection() {
    let user = null;
    if (JSON.parse(localStorage.getItem('userdata')) !== null) {
        const { 'First Name': username } = JSON.parse(
            localStorage.getItem('userdata')
        );
        user = username;
    }

    // eslint-disable-next-line no-undef
    const id = process.env.REACT_APP_CLIENT_ID;

    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.clear();
        navigate('/');
    };

    if (user) {
        return (
            <div className='formPage'>
                <h2>
                    Hello,
                    {user}. Which Request do you want to make today?
                </h2>
                <div className='cardBox'>
                    <Link to='/perdiem' className='formCard perdiem'>
                        Per Diem
                    </Link>

                    <Link to='/pettycash' className='formCard pettycash'>
                        Petty Cash
                    </Link>
                    <a
                        href='https://form.asana.com/?hash=4cec248142399fe2adf63e11e2776be9992ddba2278dee41d2e205cac949cf06&id=1195154733712537'
                        rel="nofollow noreferrer"
                        className='formCard vehicle'
                    >
                        Vehicle
                    </a>
                </div>
                <footer className='formFooter'>
                    <div>
                        Leave Feedback or Suggestion{' '}
                        <a
                            href='https://docs.google.com/forms/u/1/d/1pwi3OGlRtLydOes6R5YY79one_6QKqxqtvgy24X1ezI/edit'
                            rel="nofollow noreferrer"
                            target="_blank"
                        >
                            HERE
                        </a>
                    </div>
                    <div>
                        <span className='outtext'>
                            Not { user}?
                        </span>
                        <GoogleLogout
                            render={(renderProps) => (
                                <Button
                                    variant='contained'
                                    size='large'
                                    onClick={renderProps.onClick}
                                    endIcon={<LogoutIcon />}
                                >
                                    LOGOUT
                                </Button>
                            )}
                            clientId={id}
                            onLogoutSuccess={logout}
                        />
                    </div>
                </footer>
            </div>
        );
    }

    return (
        <div>
            Please <Link to='/'>LOGIN</Link> to view forms
        </div>
    );
}

export default FormSelection;
