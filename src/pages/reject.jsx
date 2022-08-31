import React from 'react';
import axios from 'axios';
import {
    TextField,
    FormControl,
    InputLabel,
    Button,
    CircularProgress,
    Select,
    MenuItem,
} from '@mui/material';
import Greeting from '../components/greeting';

const Reject = () => {
    const [reason, setReason] = React.useState('');
    const [other, setOther] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const reasons = [
        'Not Enough Information',
        'Wrong Department / Budget codes',
        'Too expensive',
        'Already ordered / invoiced',
        'Issue with supplier',
        'Other',
    ];
    const TYPE = location.href.includes('pettycash') ? 'pettycash' : 'perdiem';
    const API_URI = `https://esformsbackend.herokuapp.com/reject/${TYPE}`;
    // const API_URI = 'http://localhost:3001/reject/';
    // const headers = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };
    const ID = location.href.split('=')[1].split('&')[0];
    const FILE = location.href.split('=')[2];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await axios
            .post(API_URI, { reason, other, ID, FILE, TYPE })
            .then((response) => {
                setLoading(false);
                console.log(response);
                window.confirm(
                    'You have denied this request. Relevant Parties will be notified.'
                );
                window.close();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log(TYPE);
    return (
        <div className='reject'>
            <Greeting
                user=' Manager '
                text='Please let us know your reason for rejecting the request'
            />
            <form onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
                    <InputLabel id='demo-simple-select-label'>
                        Reason?
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={reason}
                        placeholder='Select a reson for rejection'
                        label='Reason '
                        name='reason'
                        required
                        onChange={(e) => setReason(e.target.value)}
                    >
                        {reasons.map((el, i) => (
                            <MenuItem required key={i} value={el}>
                                {el}
                            </MenuItem>
                        ))}
                    </Select>
                    {reason === 'Other' ? (
                        <TextField
                            type='text'
                            size='large'
                            label='Please specify'
                            multiline
                            minRows={3}
                            name='other_specify'
                            className='textInput'
                            onChange={(e) => setOther(e.target.value)}
                        />
                    ) : null}
                </FormControl>
                <Button
                    color='primary'
                    variant='outlined'
                    type='submit'
                    size='large'
                    className='submitButton'
                >
                    {loading ? <CircularProgress color='inherit' /> : 'submit'}
                </Button>
            </form>
        </div>
    );
};

export default Reject;
