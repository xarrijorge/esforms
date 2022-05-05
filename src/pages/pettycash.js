import React from 'react'
import axios from 'axios'
import Item from '../components/Item'
import { useNavigate } from 'react-router-dom'
import '../styles/pettycash.css'

import { BsFillPlusCircleFill } from 'react-icons/bs'
import { TextField, Button } from '@mui/material'

function PettyCash() {
    const [list, setList] = React.useState([<Item count={0} />])
    const [itemsData, setitemsData] = React.useState({})
    const [submitData, setSubmitData] = React.useState({})
    const [bankDetails, setBankDetails] = React.useState({})

    const data = JSON.parse(localStorage.getItem('userdata'))

    const updateList = (e) => {
        e.preventDefault()
        setList([...list, <Item />])
    }
    const handleBankChange = (e) => {
        setBankDetails({
            ...bankDetails,
            [e.target.name]: e.target.value,
        })
    }

    const SUBMIT_URI = 'https://esformsbackend.herokuapp.com/requests/pettycash'
    // const SUBMIT_URI = 'http://localhost:3001/pettycash'
    const headers = { 'content-type': 'application/json' }

    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
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
    }, [itemsData, bankDetails])

    return (
        <div className='pettycashForm'>
            <form onSubmit={handleSubmit}>
                <h2>
                    Welcome, {data['First Name']}. Please fill out the form
                    below.
                </h2>
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
                            label='B-Band Number'
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
                    <button
                        disabled={list.length >= 15 ? true : false}
                        className='addButton'
                        onClick={updateList}>
                        <BsFillPlusCircleFill />
                    </button>
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
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default PettyCash
