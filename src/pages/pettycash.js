import React from 'react'
import axios from 'axios'
import Greeting from '../components/greeting'
import Item from '../components/Item'
import { useNavigate } from 'react-router-dom'
import '../styles/pettycash.css'

import { BsFillPlusCircleFill } from 'react-icons/bs'
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
} from '@mui/material'

function PettyCash() {
    const [itemsData, setitemsData] = React.useState({})
    const [itemsTotal, setItemsTotal] = React.useState(100)
    const [submitData, setSubmitData] = React.useState({})
    const [list, setList] = React.useState([<Item count={0} />])
    const [bankDetails, setBankDetails] = React.useState({})
    const [currency, setCurrency] = React.useState('USD')
    const [loading, setLoading] = React.useState(false)

    const TOTAL = []

    let navigate = useNavigate()

    const data = JSON.parse(localStorage.getItem('userdata'))
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

    const updateList = (e) => {
        e.preventDefault()
        setList([...list, <Item />])
    }

    let USD_Total = 500
    let LRD_Total = 92500
    let LE_Total = 6413630

    const blockRequest = (thold = LE_Total) => {
        if (currency === 'USD') {
            thold = USD_Total
        } else if (currency === 'LRD') {
            thold = LRD_Total
        }
        alert(
            `Request exceeds Petty Cash Threshold of ${thold}${currency}! Please make a Purhcase Request Instead`
        )
        navigate('/formSelection')
        return
    }

    const checkTotal = () => {
        if (currency === 'LE' && itemsTotal >= LE_Total) blockRequest()
        if (currency === 'USD' && itemsTotal >= USD_Total) blockRequest()
        if (currency === 'LRD' && itemsTotal >= LRD_Total) blockRequest()
    }

    const handleBankChange = (e) => {
        setBankDetails({
            ...bankDetails,
            [e.target.name]: e.target.value,
            currency: currency,
        })
    }
    // const SUBMIT_URI = 'https://esformsbackend.herokuapp.com/requests/pettycash'
    const SUBMIT_URI = 'http://localhost:3001/requests/pettycash'
    const headers = { 'content-type': 'application/json' }

    const handleSubmit = async (e) => {
        e.preventDefault()
        checkTotal()
        await axios
            .post(SUBMIT_URI, { ...submitData, user: data }, headers)
            .then((response) => {
                console.log(response)
                navigate('/formselection')
            })
            .catch((err) => {
                console.log(err)
            })

        console.log({ ...submitData, user: data })
    }

    React.useEffect(() => {
        delete itemsData['']
        Object.keys(itemsData)
            .filter((key) => !itemsData[key].cost || !itemsData[key].amount)
            .forEach((key) => delete itemsData[key])

        setSubmitData({ ...bankDetails, items: { ...itemsData } })

        for (let el in itemsData) {
            let index = parseInt(el)
            TOTAL[index] = itemsData[el].total
        }
        setItemsTotal(
            TOTAL.reduce((x, y) => {
                return x + y
            }, 0)
        )
    }, [itemsData, bankDetails, TOTAL])

    return (
        <div className='pettycashForm'>
            <Greeting user={data['First Name']} />
            <form onSubmit={handleSubmit}>
                <h3>Bank Details Section</h3>
                <section className='banksection'>
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
                            label='Mobile Money Number'
                            name='momonumber'
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
                    <span>
                        <TextField
                            type='text'
                            size='small'
                            label='Budget Code'
                            name='budgetcode'
                            className='textInput'
                            onChange={handleBankChange}
                        />
                    </span>
                    {/* currency selection section */}
                    <div>
                        <FormLabel id='purpose-group-label'>
                            Please Select Your Currency
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby='purpose-group-label'
                            row
                            onChange={(e) => setCurrency(e.target.value)}
                            name='currency'>
                            <FormControlLabel
                                value='USD'
                                control={<Radio />}
                                label='USD'
                            />
                            <FormControlLabel
                                value='LE'
                                control={<Radio required />}
                                label='LE'
                            />
                            <FormControlLabel
                                value='LRD'
                                control={<Radio />}
                                label='LRD'
                            />
                        </RadioGroup>
                    </div>
                </section>
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
                                    Total Claim
                                </InputLabel>
                                <OutlinedInput
                                    value={itemsTotal}
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
                            disabled={list.length >= 15 ? true : false}
                            className='addButton'
                            onClick={updateList}>
                            <BsFillPlusCircleFill />
                        </button>
                    </footer>
                </section>
                <span>
                    <TextField
                        type='text'
                        size='small'
                        label='Link to Invoices Folder'
                        name='invoices'
                        className='textInput'
                        onChange={handleBankChange}
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

export default PettyCash
