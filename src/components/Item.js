import React from 'react'
import TextField from '@mui/material/TextField'

const Item = ({ count, data, setData }) => {
    const [unitCost, setCost] = React.useState(1)
    const [amount, setAmount] = React.useState(1)
    const [itemName, setItemName] = React.useState('')
    const [total, setTotal] = React.useState(0)
    const [elData, setElData] = React.useState({})

    React.useEffect(() => {
        setTotal(amount * unitCost)
        setData({ ...data, [itemName]: { ...elData, total: total } })
    }, [amount, itemName, data, elData, unitCost, total, setTotal, setData])

    return (
        <div className='elDiv'>
            <TextField
                className='textInput'
                required
                type='text'
                size='small'
                id='outlined-required'
                label='Item Name'
                name={`item${count}`}
                onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
                className='textInput'
                required
                type='number'
                size='small'
                label='Unit Cost'
                onChange={(e) => {
                    setCost(e.target.value)
                    setElData({ ...elData, cost: e.target.value })
                }}
                name={`cost${count}`}
            />
            <TextField
                type='number'
                className='textInput'
                size='small'
                label='Amount'
                onChange={(e) => {
                    setAmount(e.target.value)
                    setElData({
                        ...elData,
                        amount: e.target.value,
                    })
                }}
                name={`amount${count}`}
            />
            <TextField
                className='textInput'
                type='number'
                size='small'
                label='Total'
                value={total}
                name={`total${count}`}
            />
        </div>
    )
}

export default Item
