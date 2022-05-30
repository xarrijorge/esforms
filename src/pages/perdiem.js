import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Greeting from '../components/greeting'
import '../styles/perdiem.css'
import {
    TextField,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    OutlinedInput,
    Button,
    CircularProgress,
    InputAdornment,
} from '@mui/material'

import BasicDatePicker from '../components/BasicDatePicker'

const PerDiem = () => {
    const [formData, setFormData] = React.useState({})
    const [dateValue, setDateValue] = React.useState(new Date())
    const data = JSON.parse(localStorage.getItem('userdata'))
    const [claim, setClaim] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    const currencyLabel = window.location.href.includes('lib') ? 'LRD' : 'LE'

    const calculateClaim = React.useCallback(() => {
        let nights =
            formData.accommodation !== 'No' ? parseInt(formData.nights) : 0
        let days = parseInt(formData.days) || 1

        if (days <= 0) {
            days = 1
        }
        if (nights <= 0) {
            nights = 0
        }

        const mealVal = parseInt(data.Meals.replace(/[^a-z0-9]/gi, '')) * days
        const accVal =
            parseInt(data.Accommodation.replace(/[^a-z0-9]/gi, '')) * nights

        const TOTALCLAIM = nights > 0 ? mealVal + accVal : mealVal

        setClaim(TOTALCLAIM)
        setFormData({ ...formData, TOTALCLAIM: TOTALCLAIM })
    }, [data.Meals, data.Accommodation, formData])

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

    // const API_URI = 'https://esformsbackend.herokuapp.com/requests/perdiem'
    const API_URI = 'http://localhost:3001/requests/perdiem'
    const headers = { 'content-type': 'application/json' }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        await axios
            .post(API_URI, { ...formData, user: data }, headers)
            .then((response) => {
                console.log(formData)
                navigate('/formselection')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        calculateClaim()
    }, [calculateClaim])

    return (
        <div className='perdiemform'>
            <Greeting user={data['First Name']} />
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
                            label='Number of Days'
                            defaultValue={1}
                            required
                            name='days'
                            type='number'
                            InputProps={{
                                readOnly: false,
                                min: 1,
                                max: 30,
                            }}
                            variant='outlined'
                            onChange={handleChange}
                        />
                    </div>
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
                    {formData.accommodation === 'Yes' ? (
                        <div className='inputdiv'>
                            <TextField
                                label='Number of Nights'
                                required
                                name='nights'
                                type='number'
                                InputProps={{
                                    readOnly: false,
                                    min: 0,
                                    max: 30,
                                }}
                                variant='outlined'
                                onChange={handleChange}
                            />
                        </div>
                    ) : null}
                    {/* <div className='inputdiv radioset'>
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
                    </div> */}
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
                {formData.purpose === 'Other' ? (
                    <TextField
                        type='text'
                        size='small'
                        label='Please specify'
                        name='other_specify'
                        className='textInput'
                        onChange={handleChange}
                    />
                ) : null}

                <div className='inputdiv'>
                    <FormControl>
                        <InputLabel htmlFor='outlined-adornment-amount'>
                            Total Claim
                        </InputLabel>
                        <OutlinedInput
                            value={claim.toLocaleString()}
                            name='totalclaim'
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position='start'>
                                    {currencyLabel}
                                </InputAdornment>
                            }
                            label='Amount'
                        />
                    </FormControl>
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
