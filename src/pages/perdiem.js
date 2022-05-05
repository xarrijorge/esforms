import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/perdiem.css'
import {
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Button,
    CircularProgress,
} from '@mui/material'

import BasicDatePicker from '../components/BasicDatePicker'

const PerDiem = () => {
    const [formData, setFormData] = React.useState({})
    const [dateValue, setDateValue] = React.useState(null)
    const data = JSON.parse(localStorage.getItem('userdata'))
    const [claim, setClaim] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    const calculateClaim = () => {
        const nights =
            formData.nights !== 'No' ? parseInt(formData.nights) : null
        const days = formData.days !== 'No' ? parseInt(formData.days) : null

        const mealVal = parseInt(data.Meals.replace(/[^a-z0-9]/gi, '')) * days
        const accVal =
            parseInt(data.Accommodation.replace(/[^a-z0-9]/gi, '')) * nights

        const TOTALCLAIM = mealVal + accVal

        setClaim(TOTALCLAIM)
        setFormData({ ...formData, TOTALCLAIM: TOTALCLAIM })
    }
    const handleChange = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
            date: dateValue.toDateString() || '',
        })
        console.log(formData)
    }
    axios.interceptors.request.use(function (config) {
        // spinning start to show
        setLoading(true)
        return config
    })

    axios.interceptors.response.use(function (response) {
        // spinning hide
        setLoading(false)
        return response
    })

    const API_URI = 'https://esformsbackend.herokuapp.com/requests/perdiem'
    // const API_URI = 'http://localhost:3001/requests'
    const headers = { 'content-type': 'application/json' }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        await axios
            .post(API_URI, formData, headers)
            .then((response) => {
                navigate('/formselection')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='perdiemform'>
            <h2 className='greeting'>
                Welcome, {data['First Name']}. Please Fill out the details below
            </h2>
            <form className='mainForm' onSubmit={handleSubmit}>
                <div>
                    <div className='inputdiv'>
                        <BasicDatePicker
                            dateValue={dateValue}
                            setDateValue={setDateValue}
                        />
                    </div>
                    <div className='inputdiv'>
                        <TextField
                            label='Destination'
                            name='destination'
                            required
                            InputProps={{
                                readOnly: false,
                            }}
                            variant='outlined'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='inputdiv'>
                        <TextField
                            label='Number of Nights'
                            required
                            name='nights'
                            type='number'
                            InputProps={{
                                readOnly: false,
                                min: 0,
                                max: 10,
                            }}
                            variant='outlined'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='inputdiv'>
                        <TextField
                            label='Number of Days'
                            required
                            name='days'
                            type='number'
                            InputProps={{
                                readOnly: false,
                                min: 0,
                                max: 10,
                            }}
                            variant='outlined'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <FormLabel id='purpose-group-label'>
                    What is the Purpose of your trip?
                </FormLabel>
                <RadioGroup
                    aria-labelledby='purpose-group-label'
                    defaultValue='No'
                    required
                    onChange={handleChange}
                    name='purpose'>
                    <FormControlLabel
                        value='FSVisit'
                        control={<Radio />}
                        label='Field/Site Visit'
                    />
                    <FormControlLabel
                        value='Meeting'
                        control={<Radio />}
                        label='Meeting'
                    />
                    <FormControlLabel
                        value='Delivery'
                        control={<Radio />}
                        label='Delivery'
                    />
                    <FormControlLabel
                        value='Other'
                        control={<Radio />}
                        label='Other'
                    />
                </RadioGroup>

                <div className='inputdiv radioset'>
                    <FormLabel id='accommodation-group-label'>
                        Accommodation
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby='accommodation-group-label'
                        defaultValue='No'
                        row
                        onChange={handleChange}
                        name='accommodation'>
                        <FormControlLabel
                            value='Yes'
                            control={<Radio />}
                            label='Yes'
                        />
                        <FormControlLabel
                            value='No'
                            control={<Radio />}
                            label='No'
                        />
                    </RadioGroup>
                </div>
                <div className='inputdiv radioset'>
                    <FormLabel id='demo-radio-buttons-group-label'>
                        Meals
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby='meals-group-label'
                        defaultValue='No'
                        row
                        onChange={handleChange}
                        name='meals'>
                        <FormControlLabel
                            value='Yes'
                            control={<Radio />}
                            label='Yes'
                        />
                        <FormControlLabel
                            value='No'
                            control={<Radio />}
                            label='No'
                        />
                    </RadioGroup>
                </div>
                <Button
                    disabled={
                        formData.accommodation === 'Yes' ||
                        formData.meals === 'Yes'
                            ? false
                            : true
                    }
                    variant='outlined'
                    onClick={calculateClaim}>
                    Calculate Claim
                </Button>
                <div className='inputdiv'>
                    <TextField
                        label='Total Claim'
                        name='totalclaim'
                        value={claim}
                        type='text'
                        InputProps={{
                            readOnly: true,
                        }}
                        variant='outlined'
                        onChange={handleChange}
                    />
                </div>
                <Button
                    color='primary'
                    variant='outlined'
                    type='submit'
                    size='large'
                    className='submitButton'>
                    {loading ? <CircularProgress color='inherit' /> : 'submit'}
                </Button>
            </form>
        </div>
    )
}

export default PerDiem
