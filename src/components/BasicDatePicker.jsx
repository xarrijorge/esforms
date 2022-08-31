/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import DatePicker from '@mui/lab/DatePicker';

export default function BasicDatePicker({
    dateValue,
    setDateValue,
    disablepast,
    label = 'Date of leaving Station?',
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                disablePast={!disablepast}
                disableFuture={disablepast}
                label={label}
                value={dateValue}
                inputFormat='MM/dd/yyyy'
                // defaultValue='January 1, 2022'
                name='date'
                onChange={(newValue) => {
                    setDateValue(newValue);
                }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}

export function ReverseDatePicker({
    dateValue,
    setDateValue,
    past = false,
    future = false,
    label = 'Date of leaving Station?',
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                disablePast={past}
                disableFuture={future}
                label={label}
                value={dateValue}
                inputFormat='MM/dd/yyyy'
                // defaultValue='January 1, 2022'
                name='date'
                onChange={(newValue) => {
                    setDateValue(newValue);
                }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
