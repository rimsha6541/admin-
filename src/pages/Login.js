import React,{useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Button } from '@windmill/react-ui';
import { ImFacebook, ImGoogle } from 'react-icons/im';
import Error from '../components/form/Error';
import LabelArea from '../components/form/LabelArea';
import InputArea from '../components/form/InputArea';
import ImageLight from '../assets/img/login-office.jpeg';
import ImageDark from '../assets/img/login-office-dark.jpeg';
import useLoginSubmit from '../hooks/useLoginSubmit';
import { useHistory } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation=useHistory();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(username.length!=0 && password.length!=0){
      // console.log({username,password})
       await axios.post('http://127.0.0.1:8000/user/admin_login/',{
        username: username,
        password:password
       }).then((response)=>{
          // console.log('AAAAA')
          console.log(response);
          if(!response.data.error){
            localStorage.setItem('logged_in',true)
            localStorage.setItem('user',JSON.stringify(response.data.data))
            // navigation('/');
            navigation.push('/')
          }else{
            alert(response.data.msg)
          }
       }).catch((err)=>{
            console.log(err)
       })
    }

  }
  useEffect(()=>{
    localStorage.clear()
  })
  const { onSubmit, register, errors, loading } =
    useLoginSubmit();

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src={ImageLight}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <form>
                  <LabelArea label="Username" />
                  <InputArea
                    register={register}
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="john@doe.com"
                  />
                  <Error errorName={errors.username} />
                  <div className="mt-6"></div>
                  <LabelArea label="Password" />
                  <InputArea
                    register={register}
                    defaultValue="1234567123"
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="***************"
                  />
                  <Error errorName={errors.password} />

                  <Button
                    disabled={loading}
                    type="submit"
                    className="mt-4 h-12 w-full"
                    // to="/dashboard"
                    onClick={handleSubmit}
                  >
                    Log in
                  </Button>
                  <hr className="my-10" />
                 
                </form>

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-green-500 dark:text-green-400 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </p>
                <p className="mt-1">
                  {/* <Link
                    className="text-sm font-medium text-green-500 dark:text-green-400 hover:underline"
                    to="/signup"
                  >
                    Create account
                  </Link> */}
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
