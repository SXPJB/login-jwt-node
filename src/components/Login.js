import React, {useState} from 'react';
import axios from "axios";
import {setUserSession} from "../utils/Common";

export default function Login(props) {
    const userName = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLading] = useState(false);

    //handle button click of login from
    const handleLogin = () => {
        setError(null)
        setLading(null)
        axios.post('http://localhost:4000/users/signing', {
            userName: userName.value,
            password: password.value
        }).then(res => {
            setLading(false);
            setUserSession(res.data.token, res.data.user);
            props.history.push('/dashboard');
        }).catch(e => {
            if (e.response) {
                setLading(false);
                if (e.response.status === 401) {
                    setError(e.response.data.message);
                } else {
                    setError("Something went wrong. Please try again later")
                }
            } else if (e.request) {
                alert('Server error... Please try again later')
            }
        })

    }

    return (
        <div className='container'>
            <h1 className='text-center'>Login</h1>
            <div className='mb-3'>
                <label>Username</label>
                <input className='form-control' type='text' {...userName} autoComplete="new-password"/>
            </div>
            <div className='mb-3'>
                <label>Password</label>
                <input className='form-control' type='password' {...password} autoComplete="new-password"/>
            </div>
            {error && <><small style={{color: 'red'}}>{error}</small><br/></>}<br/>
            <div className='d-grid gap-2'>
                <input className='btn btn-primary' type="button" value={loading ? 'Loading...' : 'login'}
                       onClick={handleLogin} disabled={loading}/><br/>
            </div>
        </div>
    )

}

const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}
