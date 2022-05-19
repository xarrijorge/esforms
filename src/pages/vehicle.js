import React from 'react'
import axios from 'axios'
import Greeting from '../components/greeting'
import { useNavigate } from 'react-router-dom'
import '../styles/vehicle.css'
import {
    TextField,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    InputLabel,
    Select,
    MenuItem,
    FormLabel,
    Button,
    CircularProgress,
} from '@mui/material'

import BasicDatePicker from '../components/BasicDatePicker'

const Vehicle = () => {
    const [formData, setFormData] = React.useState({})
    const [departureDate, setDeparture] = React.useState(null)
    const [returnDate, setReturn] = React.useState(null)
    const data = JSON.parse(localStorage.getItem('userdata'))
    const [loading, setLoading] = React.useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
            departuredate: departureDate,
            returndate: returnDate || departureDate,
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

    // const API_URI = 'https://esformsbackend.herokuapp.com/requests/vehicle'
    const API_URI = 'http://localhost:3001/requests/vehicle'
    const headers = { 'content-type': 'application/json' }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        await axios
            .post(
                API_URI,
                {
                    ...formData,
                    departuredate: departureDate.toDateString(),
                    returndate:
                        returnDate !== null
                            ? returnDate.toDateString()
                            : departureDate.toDateString(),
                    user: data,
                },
                headers
            )
            .then((response) => {
                navigate('/formselection')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='vehicleForm'>
            <Greeting user={data['First Name']} />

            <form className='mainForm' onSubmit={handleSubmit}>
                <div>
                    <div className='inputdiv'>
                        <BasicDatePicker
                            dateValue={departureDate}
                            setDateValue={setDeparture}
                            label='Date Vehicle is needed?'
                            required
                        />
                    </div>
                    <FormLabel id='daytrip-group-label'>
                        Is it a one day trip?
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby='daytrip-group-label'
                        defaultValue='Yes'
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

                    {formData.onedaytrip === 'No' ? (
                        <div className='inputdiv'>
                            <BasicDatePicker
                                dateValue={returnDate}
                                setDateValue={setReturn}
                                label='Return Date'
                            />
                        </div>
                    ) : null}
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

                    <FormLabel id='daytrip-group-label'>
                        Are you requesting for someone?
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby='daytrip-group-label'
                        defaultValue='No'
                        onChange={handleChange}
                        row
                        name='thirdpartyrequest'>
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
                    {formData.thirdpartyrequest === 'Yes' && (
                        <div className='inputdiv'>
                            <TextField
                                label='Person Name'
                                name='thirpartyname'
                                type='text'
                                variant='outlined'
                                onChange={handleChange}
                            />
                            <TextField
                                label='Person Email'
                                name='thirdpartyemail'
                                type='text'
                                variant='outlined'
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
                        <InputLabel id='demo-simple-select-label'>
                            What Type of Vehicle do you need?
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={formData.vehicle}
                            placeholder='Select One'
                            label='Type of Vehicle'
                            name='vehicle'
                            required
                            onChange={handleChange}>
                            <MenuItem required value='4x4'>
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
                    </FormControl>
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
                        control={<Radio required />}
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
                <span>
                    <TextField
                        type='text'
                        size='small'
                        label='Route Distribution Plan'
                        name='routeplan'
                        className='textInput'
                    />
                </span>

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

export default Vehicle
