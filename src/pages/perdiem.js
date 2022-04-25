import React, { Fragment } from 'react'
import axios from 'axios'
import '../styles/perdiem.css'
import {
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    InputLabel,
    Select,
    MenuItem,
    FormLabel,
    Button,
} from '@mui/material'

import BasicDatePicker from '../components/BasicDatePicker'

const PerDiem = () => {
    const [formData, setFormData] = React.useState({})
    const [dateValue, setDateValue] = React.useState(null)
    const data = JSON.parse(localStorage.getItem('userdata'))
    const [claim, setClaim] = React.useState(0)

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
        })
        console.log(formData)
    }
    const API_URI = 'https://esformsbackend.herokuapp.com/requests'
    // const API_URI = 'http://localhost:3001/requests'
    const headers = { 'content-type': 'application/json' }

    // console.log(formik.values)
    const handleSubmit = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            totalclaim: claim,
        })
        await axios
            .post(API_URI, formData, headers)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Fragment>
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
                <div className='inputdiv radioset'>
                    <FormLabel id='transportation-group-label'>
                        Transportation
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby='transportation-group-label'
                        defaultValue='No'
                        row
                        onChange={handleChange}
                        name='transportation'>
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
                {formData.transportation === 'Yes' ? (
                    <div className='inputdiv'>
                        <h2>Vehicle Request Section</h2>
                        <div>
                            <InputLabel id='demo-simple-select-label'>
                                What Type of Vehicle do you need?
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={formData.vehicle}
                                defaultValue='any'
                                label='Type of Vehicle'
                                name='vehicle'
                                required
                                onChange={handleChange}>
                                <MenuItem value='4x4'>
                                    4x4 Land Cruiser
                                </MenuItem>
                                <MenuItem value='van' name='vehicle'>
                                    Sprinter Van
                                </MenuItem>
                                <MenuItem value='Truck' name='vehicle'>
                                    Truck
                                </MenuItem>
                                <MenuItem value='Kehkeh' name='vehicle'>
                                    Keh Keh
                                </MenuItem>
                                <MenuItem value='Motorbike' name='vehicle'>
                                    Motorbike
                                </MenuItem>
                                <MenuItem value='any' name='vehicle'>
                                    Any Available Option
                                </MenuItem>
                            </Select>
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
                        <FormLabel id='daytrip-group-label'>
                            Is it a one day trip?
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby='daytrip-group-label'
                            defaultValue='No'
                            onChange={handleChange}
                            row
                            name='onedaytrip'>
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
                        <div className='inputdiv'>
                            <TextField
                                label='Number of passengers'
                                name='passengers'
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
                                label='Are there any special requests?'
                                name='requests'
                                type='text'
                                multiline
                                rows={4}
                                InputProps={{
                                    readOnly: false,
                                }}
                                variant='outlined'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                ) : null}
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
                    Submit
                </Button>
            </form>
        </Fragment>
    )
}

export default PerDiem
