import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Home from './components/Home'

import './App.css'

function App() {
    const [loading, setLoading] = React.useState(false)
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    let navigate = useNavigate()
    const responseGoogle = async (res) => {
        await axios
            .get(
                `https://esformsbackend.herokuapp.com/users?email=${res.profileObj.email}`
            )
            .then((res) => res.data)
            .then((data) => {
                window.localStorage.setItem('userdata', JSON.stringify(data))
                navigate('/formselection')
            })

        console.log(res.profileObj.email)
    }

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

    return (
        <div className='App'>
            <Home res={responseGoogle} id={CLIENT_ID} loading={loading} />
        </div>
    )
}

export default App
