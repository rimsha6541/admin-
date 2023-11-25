import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Input, Label, Button } from '@windmill/react-ui';
import { ImFacebook, ImGoogle } from 'react-icons/im';

import Error from '../components/form/Error';
import InputArea from '../components/form/InputArea';
import LabelArea from '../components/form/LabelArea';
import SelectRole from '../components/form/SelectRole';
import useLoginSubmit from '../hooks/useLoginSubmit';
import ImageLight from '../assets/img/create-account-office.jpeg';
import ImageDark from '../assets/img/create-account-office-dark.jpeg';
import axios from 'axios';

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setphone_no] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { onSubmit, register, errors, loading } = useLoginSubmit();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors and success message
    setUsernameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setSuccessMessage("");

    let hasError = false;

    if (!/^[A-Za-z]+$/.test(username)) {
      setUsernameError("Username should contain only alphabets.");
      hasError = true;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format.");
      hasError = true;
    }

    if (!/^[0-9]{11}$/.test(phone_no)) {
      setPhoneError("Phone number should be a 10-digit number.");
      hasError = true;
    }

    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/admin_signup/",
        {
          username: username,
          email: email,
          phone_no: phone_no,
          password: password,
        }
      );

      if (!response.data.error) {
        localStorage.setItem("Sign up Successful", true);
        localStorage.setItem("user", response.data.data);
        setSuccessMessage(response.data.msg);
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.log("Error in API call:", error);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);


  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
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
                Create account
              </h1>
              <form>
                <LabelArea label="Name" />
                <InputArea
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Admin"
                />
                {usernameError && (
                  <div className="alert alert-danger mt-2">
                    {usernameError}
                  </div>
                )}
                <LabelArea label="Email" />
                <InputArea
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                />
                {emailError && (
                  <div className="alert alert-danger mt-2">
                    {emailError}
                  </div>
                )}
                <LabelArea label="Phone_no" />
                <InputArea
                  register={register}
                  label="Phone_no"
                  name="phone"
                  type="text"
                  value={phone_no}
                  onChange={(e) => setphone_no(e.target.value)}
                  placeholder="03245678912"
                />
                {phoneError && (
                  <div className="alert alert-danger mt-2">
                    {phoneError}
                  </div>
                )}
                <LabelArea label="Password" />
                <InputArea
                  register={register}
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="***************"
                />
                {passwordError && (
                  <div className="alert alert-danger mt-2">
                    {passwordError}
                  </div>
                )}

                {successMessage && (
                  <div className="alert alert-success mt-2">
                    {successMessage}
                  </div>
                )}

                <Label className="mt-6" check>
                  <Input type="checkbox" />
                  <span className="ml-2">
                    I agree to the{" "}
                    <span className="underline">privacy policy</span>
                  </span>
                </Label>

                <Button
                  // disabled={loading}
                  type="submit"
                  className="mt-4 h-12 w-full"
                  to="/dashboard"
                  block
                  onClick={handleSubmit}
                  onSubmit={handleSubmit}
                >
                  Create account
                </Button>
              </form>

              <hr className="my-10" />


              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-green-500 dark:text-green-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
