import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Breadcrumbs from './Breadcrumbs';
import axios from 'axios';
import {authentication,getUser} from '../services/authorize';
import { useNavigate } from 'react-router-dom';
import {getToken} from '../services/authorize';

import { Input } from "@material-tailwind/react";

const LoginComponent = () => {
  const navigate = useNavigate()
  const Alert = withReactContent(Swal)

  const [state, setState] = useState({
    username: 'admin',
    password: 'admin123',
  });

  const {username,password} = state

  const inputValue = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API}/login`, { username,password },{headers:{authorization:`Bearer ${getToken()}`}})
    .then(res=>{
      setState({ ...state, username: '', password: '' })
      authentication(res)
      Alert.fire({
        icon: 'success',
        timer: 1000,
        title: 'Sign in success',
        showConfirmButton: false,
      }).then(
        navigate('/')
      )

      
    })
    .catch(err =>{
      Alert.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.message,
      });
    })  
  };

  useEffect(() => {
    getUser() ? navigate('/') : ''
  }, [])
  

  return (
    <>
      <div className='mx-lg container p-8'>
        <form onSubmit={submitForm} className='flex w-full flex-col items-center justify-center'>
          <div className='border-1  rounded-lg border border-gray-300 bg-white p-10'>
          <Breadcrumbs link={`/login`} slug={`Login`} />
            <h2 className='my-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign in to your account
            </h2>
            {/* {JSON.stringify(state)} */}
            <div className='flex flex-col space-y-3'>
              <div>
                {/* <label
                  htmlFor='username'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Usename
                </label> */}
                <div className='mt-2'>
                  <Input required onChange={(event) => inputValue(event)} label="Username" value={username} autoComplete='username' id='username' type='username'/>
                  {/* <input
                    id='username'
                    name='username'
                    type='username'
                    autoComplete='username'
                    defaultValue={username}
                    required
                    className='indent-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  /> */}
                </div>
              </div>
              <div>
                <div className='flex items-center justify-between'>
                  {/* <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Password
                  </label> */}

                </div>
                <div className='mt-2'>
                  <Input onChange={(event) => inputValue(event)} value={password} label="password" id='password' type='password' autoComplete='current-password' required/>
                  {/* <input
                    onChange={(event) => inputValue(event)}
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    defaultValue={password}
                    className='indent-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  /> */}
                </div>
              </div>
              <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginComponent
