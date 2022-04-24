import React from 'react'
import { Button, CircularProgress } from '@mui/material'

export default function Home({
    handleClick,
    handleInputChange,
    inputVal,
    buttonDisabled,
    loading,
}) {
    return (
        <form className='homepage'>
            <h2> Please Enter Your Email Address</h2>
            <div>
                <input
                    className='homeinput'
                    type='email'
                    value={inputVal}
                    onChange={handleInputChange}
                    placeholder='firstname.lastname@easysolar.org'
                />
            </div>
            <Button
                className='homebutton'
                disabled={buttonDisabled}
                variant='contained'
                onClick={handleClick}>
                {loading ? <CircularProgress color='inherit' /> : 'Next'}
            </Button>
        </form>
    )
}
