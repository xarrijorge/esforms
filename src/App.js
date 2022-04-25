import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Home from './components/Home'

import './App.css'

function App() {
    const [inputVal, setInputVal] = React.useState('')
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    const API_URI = `https://esformsbackend.herokuapp.com/users?email=${inputVal}`

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
    let navigate = useNavigate()
    const GetData = async () => {
        console.log(API_URI)
        await axios
            .get(API_URI)
            .then((res) => res.data)
            .then((data) => {
                window.localStorage.setItem('userdata', JSON.stringify(data))
                navigate('/formselection')
            })
    }
    const handleInputChange = (event) => {
        event.preventDefault()
        setInputVal(event.target.value)
        if (inputVal.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/gi)) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }

    React.useEffect(() => {
        inputVal.match(/[a-z.]+@[slib.]{0,4}?[easysolar]+\.[org]{3}/g)
            ? setButtonDisabled(false)
            : setButtonDisabled(true)
    }, [inputVal])

    return (
        <div className='App'>
            <Home
                inputVal={inputVal}
                handleClick={GetData}
                handleInputChange={handleInputChange}
                buttonDisabled={buttonDisabled}
                loading={loading}
            />
        </div>
    )
}

export default App
