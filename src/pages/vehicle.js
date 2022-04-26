import React from 'react'
import axios from 'axios'
import '../styles/vehicle.css'
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

const Vehicle = () => {
    const [formData, setFormData] = React.useState({})
    const [dateValue, setDateValue] = React.useState(null)
    const data = JSON.parse(localStorage.getItem('userdata'))

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
        console.log(formData)
    }
    const API_URI = 'https://esformsbackend.herokuapp.com/requests/vehicle'
    // const API_URI = 'http://localhost:3001/requests'
    const headers = { 'content-type': 'application/json' }

    // console.log(formik.values)
    const handleSubmit = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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
        <div className='vehicleForm'>
            <h2 className='greeting'>
                Welcome, {data['First Name']}. Please Fill out the details below
            </h2>
            <form className='mainForm' onSubmit={handleSubmit}>
                <div>
                    <div className='inputdiv'>
                        <BasicDatePicker
                            dateValue={dateValue}
                            setDateValue={setDateValue}
                            label='Date Vehicle is needed?'
                        />
                    </div>
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
                        <MenuItem value='4x4'>4x4 Land Cruiser</MenuItem>
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
                <Button
                    color='primary'
                    variant='outlined'
                    type='submit'
                    size='large'
                    className='submitButton'>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default Vehicle
