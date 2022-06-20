import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import { FormSelection } from './pages/FormSelection'
import PerDiem from './pages/perdiem'
import PettyCash from './pages/pettycash'
// import Vehicle from './pages/vehicle'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/formselection' element={<FormSelection />} />
                <Route path='/perdiem' element={<PerDiem />} />
                <Route path='/pettycash' element={<PettyCash />} />
                {/* <Route path='/vehicle' element={<Vehicle />} /> */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
