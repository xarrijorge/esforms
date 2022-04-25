import React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

export default function BasicDatePicker({ dateValue, setDateValue }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label='Date of Leavning Station'
                value={dateValue}
                name='date'
                onChange={(newValue) => {
                    setDateValue(newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}
