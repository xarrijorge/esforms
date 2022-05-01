import React from 'react'
import TextField from '@mui/material/TextField'

const Item = ({ count, data, setData }) => {
    const [unitCost, setCost] = React.useState(1)
    const [amount, setAmount] = React.useState(1)
    const [itemName, setItemName] = React.useState('')
    const [total, setTotal] = React.useState(0)
    const [description, setInfo] = React.useState('')

    const handleNameChange = (e) => {
        // setAmount(0)
        // setCost(0)
        // setInfo('')
        setItemName(e.target.value)
    }

    React.useEffect(() => {
        setTotal(amount * unitCost)
        setData({
            ...data,
            [count]: {
                name: itemName,
                description: description,
                cost: unitCost,
                amount: amount,
                total: total,
            },
        })
    }, [itemName, description, amount, unitCost, total, count, data, setData])

    return (
        <div className='elDiv'>
            <TextField
                className='textInput'
                required
                type='text'
                size='small'
                id='outlined-required'
                label='Item Name'
                value={itemName}
                name={`item${count}`}
                onChange={handleNameChange}
            />
            <TextField
                className='textInput'
                required
                type='text'
                size='small'
                id='outlined-required'
                label='description'
                multiline
                minRows={2}
                name={`item${count}`}
                onChange={(e) => setInfo(e.target.value)}
            />
            <TextField
                className='textInput'
                required
                type='number'
                size='small'
                label='Unit Cost'
                value={unitCost}
                onChange={(e) => setCost(e.target.value)}
                name={`cost${count}`}
            />

            <TextField
                type='number'
                className='textInput'
                size='small'
                label='Amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                name={`amount${count}`}
            />
            <TextField
                className='textInput'
                type='number'
                size='small'
                label='Total'
                value={total}
            />
        </div>
    )
}

export default Item
