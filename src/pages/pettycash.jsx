/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/pettycash.css';
import { BsFillPlusCircleFill, BsCloudCheckFill } from 'react-icons/bs';
import { MdCloudUpload } from 'react-icons/md';
import {
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormLabel,
    Button,
    CircularProgress,
    Select,
    MenuItem,
} from '@mui/material';
import Greeting from '../components/greeting';
import Item from '../components/Item';
import budgetCodes, { departments } from '../components/budgetCodes';

function PettyCash() {
    const [itemsData, setitemsData] = React.useState({});
    const [itemsTotal, setItemsTotal] = React.useState(100);
    const [submitData, setSubmitData] = React.useState({});
    // eslint-disable-next-line react/jsx-key
    const [list, setList] = React.useState([<Item count={0} />]);
    const [bankDetails, setBankDetails] = React.useState({});
    const [currency, setCurrency] = React.useState('USD');
    const [loading, setLoading] = React.useState(false);
    const [budgetCode, setBudgetCode] = React.useState(['select option']);
    const [department, setDepartment] = React.useState('Select Department');
    const [invoiceDoc, setInvoice] = React.useState('');

    const TOTAL = React.useMemo(() => [], []);
    const currencyLabel = window.location.href.includes('lib') ? 'LRD' : 'LE';

    const navigate = useNavigate();

    const data = JSON.parse(localStorage.getItem('userdata'));
    // axios.interceptors.request.use(function (config) {
    //   // spinning start to show
    //   setLoading(true);
    //   return config;
    // });

    // axios.interceptors.response.use(function (response) {
    //   // spinning hide
    //   setLoading(false);
    //   return response;
    // });

    const addOneToList = (e) => {
        e.preventDefault();
        // eslint-disable-next-line react/jsx-key
        setList([...list, <Item />]);
    };
    // const removeLastItem = (e) => {
    //     e.preventDefault()
    //     let newList = [...list.pop()]
    //     setList([...newList])
    // }

    const USD_Total = 500;
    const LRD_Total = 92500;
    const LE_Total = 6413630;

    const blockRequest = (thold = LE_Total) => {
        if (currency === 'USD') {
            thold = USD_Total;
        } else if (currency === 'LRD') {
            thold = LRD_Total;
        }
        window.alert(
            `Request exceeds Petty Cash Threshold of ${thold}${currency}! Please make a Purhcase Request Instead`
        );
        navigate('/formSelection');
    };

    const checkTotal = () => {
        if (currency === 'LE' && itemsTotal >= LE_Total) blockRequest();
        if (currency === 'USD' && itemsTotal >= USD_Total) blockRequest();
        if (currency === 'LRD' && itemsTotal >= LRD_Total) blockRequest();
    };

    const handleBankChange = (e) => {
        setBankDetails({
            ...bankDetails,
            [e.target.name]: e.target.value,
            currency,
            department,
            budgetcode: budgetCode,
        });
        setBudgetCode([...budgetCodes[itemsData.department]]);
    };
    const SUBMIT_URI =
        'https://esformsbackend.herokuapp.com/requests/pettycash';
    // const UPLOAD_URI= 'https://esformsbackend.herokuapp.com/requests/upload';
    // const SUBMIT_URI = 'http://localhost:3001/requests/pettycash';
    // const UPLOAD_URI = 'http://localhost:3001/requests/upload';
    // const serverURL = 'http://localhost:3001';
    const config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('invoice', invoiceDoc);
        formData.append('details', JSON.stringify(submitData));
        formData.append('user', JSON.stringify(data));
        checkTotal();

        await axios
            .post(SUBMIT_URI, formData, config)
            // eslint-disable-next-line no-unused-vars
            .then((response) => {
                // eslint-disable-next-line no-alert
                window.confirm(
                    'Your Request was successful. You Line Manager will receive the details'
                );
                setLoading(false);
                navigate('/formselection');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        delete itemsData[''];
        Object.keys(itemsData)
            .filter((key) => !itemsData[key].cost || !itemsData[key].amount)
            .forEach((key) => delete itemsData[key]);

        setSubmitData({
            ...bankDetails,
            items: { ...itemsData },
        });

        for (const el in itemsData) {
            const index = parseInt(el);
            TOTAL[index] = itemsData[el].total;
        }
        setItemsTotal(TOTAL.reduce((x, y) => x + y, 0));
    }, [itemsData, bankDetails, TOTAL, invoiceDoc]);

    return (
        <div className='pettycashForm'>
            <Greeting user={data['First Name']} />
            <form onSubmit={handleSubmit}>
                <header className='pcheader'>
                    <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
                        <InputLabel id='demo-simple-select-label'>
                            Department?
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={department}
                            placeholder='Select One'
                            label='Type of Vehicle'
                            name='deparment'
                            required
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            {departments.map((el, i) => (
                                <MenuItem required key={i} value={el}>
                                    {el}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
                        <InputLabel id='demo-simple-select-label'>
                            Budget Code?
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={budgetCode}
                            placeholder='Select One'
                            label='Type of Vehicle'
                            name='budgetcode'
                            required
                            onChange={(e) => setBudgetCode(e.target.value)}
                        >
                            {budgetCodes[department].map((el, i) => (
                                <MenuItem
                                    required
                                    key={i}
                                    value={el}
                                    defaultValue={el[0]}
                                >
                                    {el}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div className='currencybox'>
                        <FormLabel id='purpose-group-label'>
                            Please Select Your Currency
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby='purpose-group-label'
                            row
                            onChange={(e) => setCurrency(e.target.value)}
                            name='currency'
                        >
                            <FormControlLabel
                                value='USD'
                                control={<Radio />}
                                label='USD'
                            />

                            <FormControlLabel
                                value={currencyLabel}
                                control={<Radio />}
                                label={currencyLabel}
                            />
                        </RadioGroup>
                    </div>
                </header>

                <h3>Bank Details Section</h3>
                <div className='inputdiv radioset'>
                    <FormLabel id='accommodation-group-label'>
                        How do you want to receive payment?
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby='accommodation-group-label'
                        row
                        onChange={handleBankChange}
                        name='paymentmethod'
                    >
                        <FormControlLabel
                            value='Personal account'
                            control={<Radio />}
                            label='Personal Account'
                        />

                        <FormControlLabel
                            value='Other account'
                            control={<Radio />}
                            label='Other Bank Account'
                        />
                        <FormControlLabel
                            value='MoMo'
                            control={<Radio />}
                            label='Mobile Money'
                        />
                    </RadioGroup>
                </div>
                <section className='banksection'>
                    {bankDetails.paymentmethod === 'Other account' ? (
                        <>
                            <span>
                                <TextField
                                    type='text'
                                    size='small'
                                    label='Bank Name'
                                    name='bankname'
                                    className='textInput'
                                    onChange={handleBankChange}
                                />
                            </span>
                            <span>
                                <TextField
                                    type='text'
                                    size='small'
                                    label='Bank Account Name'
                                    name='accountname'
                                    className='textInput'
                                    onChange={handleBankChange}
                                />
                            </span>
                            <span>
                                <TextField
                                    type='text'
                                    size='small'
                                    label='Bank Account Number'
                                    name='accountnumber'
                                    className='textInput'
                                    onChange={handleBankChange}
                                />
                            </span>
                            <span>
                                <TextField
                                    type='text'
                                    size='small'
                                    label='BBAN Number'
                                    name='bbandnumber'
                                    className='textInput'
                                    onChange={handleBankChange}
                                />
                            </span>
                        </>
                    ) : null}
                    {bankDetails.paymentmethod === 'MoMo' ? (
                        <span>
                            <TextField
                                type='text'
                                size='small'
                                label='Mobile Money Number'
                                name='momonumber'
                                className='textInput'
                                onChange={handleBankChange}
                            />
                        </span>
                    ) : null}
                </section>

                {/* currency selection section */}
                {/* budget code / Department selection section  */}
                <section className='requestSection'>
                    <h3>Request Section</h3>
                    {list.map((item, index) => (
                        <Item
                            data={itemsData}
                            setData={setitemsData}
                            count={index}
                            key={index}
                        />
                    ))}
                    <footer>
                        <span>
                            <FormControl>
                                <InputLabel htmlFor='outlined-adornment-amount'>
                                    Request Total
                                </InputLabel>
                                <OutlinedInput
                                    value={itemsTotal.toLocaleString()}
                                    name='totalclaim'
                                    startAdornment={
                                        <InputAdornment position='start'>
                                            {currency}
                                        </InputAdornment>
                                    }
                                    label='Amount'
                                />
                            </FormControl>
                        </span>
                        <button
                            type='button'
                            disabled={list.length >= 15}
                            className='actionButton addButton'
                            onClick={addOneToList}
                        >
                            <BsFillPlusCircleFill />
                        </button>
                        {/* <button
                            disabled={list.length < 2 ? true : false}
                            className='actionButton removeButton'
                            onClick={removeLastItem}>
                            <FiMinusCircle />
                        </button> */}
                    </footer>
                </section>
                <div>
                    <label htmlFor='invoices' className='fileupload'>
                        <p>{invoiceDoc.name || 'UPLOAD INVOICE'}</p>{' '}
                        {invoiceDoc === '' ? (
                            <MdCloudUpload size={40} />
                        ) : (
                            <BsCloudCheckFill size={40} />
                        )}
                        <input
                            type='file'
                            hidden
                            // size='small'
                            name='invoices'
                            id='invoices'
                            onChange={(e) => {
                                setInvoice(e.target.files[0]);
                            }}
                        />
                    </label>
                </div>

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
}

export default PettyCash;
