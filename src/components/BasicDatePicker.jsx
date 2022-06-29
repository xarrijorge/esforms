/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function BasicDatePicker({
  dateValue,
  setDateValue,
  label = 'Date of leaving Station?',
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disablePast
        label={label}
        value={dateValue}
        inputFormat="MM/dd/yyyy"
                // defaultValue='January 1, 2022'
        name="date"
        onChange={(newValue) => {
          setDateValue(newValue);
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
