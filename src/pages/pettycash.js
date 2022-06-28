import React from 'react';
import axios from 'axios';
import Greeting from '../components/greeting';
import Item from '../components/Item';
import budgetCodes, { departments } from '../components/budgetCodes';
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

function PettyCash() {
  const [itemsData, setitemsData] = React.useState({});
  const [itemsTotal, setItemsTotal] = React.useState(100);
  const [submitData, setSubmitData] = React.useState({});
  const [list, setList] = React.useState([<Item count={0} />]);
  const [bankDetails, setBankDetails] = React.useState({});
  const [currency, setCurrency] = React.useState('USD');
  const [loading, setLoading] = React.useState(false);
  const [budgetCode, setBudgetCode] = React.useState(['select option']);
  const [department, setDepartment] = React.useState('Select Department');
  const [invoiceDoc, setInvoice] = React.useState('');
  const [invoiceLink, setInvoiceLink] = React.useState('');

  const TOTAL = React.useMemo(() => [], []);
  const currencyLabel = window.location.href.includes('lib') ? 'LRD' : 'LE';

  let navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem('userdata'));
  axios.interceptors.request.use(function (config) {
    // spinning start to show
    setLoading(true);
    return config;
  });

  axios.interceptors.response.use(function (response) {
    // spinning hide
    setLoading(false);
    return response;
  });

  const addOneToList = (e) => {
    e.preventDefault();
    setList([...list, <Item />]);
  };
  // const removeLastItem = (e) => {
  //     e.preventDefault()
  //     let newList = [...list.pop()]
  //     setList([...newList])
  // }

  let USD_Total = 500;
  let LRD_Total = 92500;
  let LE_Total = 6413630;

  const blockRequest = (thold = LE_Total) => {
    if (currency === 'USD') {
      thold = USD_Total;
    } else if (currency === 'LRD') {
      thold = LRD_Total;
    }
    alert(
      `Request exceeds Petty Cash Threshold of ${thold}${currency}! Please make a Purhcase Request Instead`
    );
    navigate('/formSelection');
    return;
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
      currency: currency,
      department: department,
      budgetcode: budgetCode,
    });
    setBudgetCode([...budgetCodes[itemsData.department]]);
  };
  // const SUBMIT_URI = 'https://esformsbackend.herokuapp.com/requests/pettycash';
  // const UPLOAD_URI= 'https://esformsbackend.herokuapp.com/requests/upload';
  const SUBMIT_URI = 'http://localhost:3001/requests/pettycash';
  const UPLOAD_URI = 'http://localhost:3001/requests/upload';
  const serverURL = 'http://localhost:3001';
  const config = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('invoice', invoiceDoc);
    formData.append('details', JSON.stringify(submitData));
    formData.append('user', JSON.stringify(data));
    checkTotal();

    await axios
      .post(SUBMIT_URI, formData, config)
      .then((response) => {
    console.log(formData.get('details'));
        window.confirm('Your request has been submitted!');
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
      invoices: invoiceLink,
    });

    for (let el in itemsData) {
      let index = parseInt(el);
      TOTAL[index] = itemsData[el].total;
    }
    setItemsTotal(
      TOTAL.reduce((x, y) => {
        return x + y;
      }, 0)
    );
  }, [itemsData, bankDetails, TOTAL, invoiceDoc, invoiceLink]);

  return (
    <div className='pettycashForm'>
      <Greeting user={data['First Name']} />
      <form onSubmit={handleSubmit}>
        <header className='pcheader'>
          <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
            <InputLabel id='demo-simple-select-label'>Department?</InputLabel>
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
              {departments.map((el, i) => {
                return (
                  <MenuItem required key={i} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
            <InputLabel id='demo-simple-select-label'>Budget Code?</InputLabel>
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
              {budgetCodes[department].map((el, i) => {
                return (
                  <MenuItem required key={i} value={el} defaultValue={el[0]}>
                    {el}
                  </MenuItem>
                );
              })}
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
              <FormControlLabel value='USD' control={<Radio />} label='USD' />

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
              value='Bank'
              control={<Radio />}
              label='Bank Account'
            />
            <FormControlLabel
              value='MoMo'
              control={<Radio />}
              label='Mobile Money'
            />
          </RadioGroup>
        </div>
        <section className='banksection'>
          {bankDetails['paymentmethod'] === 'Bank' ? (
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
          {bankDetails['paymentmethod'] === 'MoMo' ? (
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
                    <InputAdornment position='start'>{currency}</InputAdornment>
                  }
                  label='Amount'
                />
              </FormControl>
            </span>
            <button
              disabled={list.length >= 15 ? true : false}
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
                console.log(e.target.files);
                setInvoice(e.target.files[0]);
                setInvoiceLink(
                  `${serverURL}/${Date.now()}--${e.target.files[0].name
                    .replace(/\s/g, '')
                    .toLowerCase()}`
                );
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
