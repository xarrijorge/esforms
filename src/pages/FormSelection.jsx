import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

function FormSelection() {
  let user = null;
  if (JSON.parse(localStorage.getItem('userdata')) !== null) {
    const { 'First Name': username } = JSON.parse(
      localStorage.getItem('userdata'),
    );
    user = username;
  }

  const id = process.env.REACT_APP_CLIENT_ID;

  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.clear();
    navigate('/');
  };

  if (user) {
    return (
      <div className="formPage">
        <h2>
          Hello,
          {user}
          . Which Request do you want to make today?
        </h2>
        <div className="cardBox">
          <Link to="/perdiem" className="formCard perdiem">
            Per Diem
          </Link>

          <Link to="/pettycash" className="formCard pettycash">
            Petty Cash
          </Link>
          <a
            href="https://form.asana.com/?hash=4cec248142399fe2adf63e11e2776be9992ddba2278dee41d2e205cac949cf06&id=1195154733712537"
            norel
            nofollow
            className="formCard vehicle"
          >
            Vehicle
          </a>
        </div>
        <footer className="formFooter">
          <span className="outtext">
            Not
            {user}
            ?
          </span>
          <GoogleLogout
            render={(renderProps) => (
              <Button
                variant="contained"
                size="large"
                onClick={renderProps.onClick}
                endIcon={<LogoutIcon />}
              >
                LOGOUT
              </Button>
            )}
            clientId={id}
            onLogoutSuccess={logout}
          />
        </footer>
      </div>
    );
  }

  return (
    <div>
      Please
      {' '}
      <Link to="/">LOGIN</Link>
      {' '}
      to view forms
    </div>
  );
}

export default FormSelection;
