import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@windmill/react-ui';

import Error from '../components/form/Error';
import useStaffSubmit from '../hooks/useStaffSubmit';
import LabelArea from '../components/form/LabelArea';
import InputArea from '../components/form/InputArea';
import { AdminContext } from '../context/AdminContext';
import SelectRole from '../components/form/SelectRole';
import PageTitle from '../components/Typography/PageTitle';
import Uploader from '../components/image-uploader/Uploader';
import { getAdminDetail,UpdateAdminDetail } from '../Axios/Axios';

const EditProfile = () => {
  const {
    state: { adminInfo },
  } = useContext(AdminContext);

  

  const [userData,setUserData]=useState('');
  const [isSubmit,setIsSubmit]=useState(0);
  

  const getDetails=async ()=>{ 
    let response= await getAdminDetail();
    setUserData(response.data[0])
  };  
  useEffect(()=>{
    getDetails();
  },[isSubmit])


  const handleChange=(e)=>{
    setUserData({...userData, [e.target.name] : e.target.value});
  }
  const handleSubmit=async()=>{
    let response = await UpdateAdminDetail(userData);
    setIsSubmit(isSubmit+1)
  }

  return (
    <>
      <PageTitle>Edit Profile</PageTitle>
      <div className="container p-6 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
        {
          userData!=''?
          <form onSubmit={handleSubmit}>
            <div className="p-6 flex-grow scrollbar-hide w-full max-h-full">
              

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Name" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    label="Name"
                    name="username"
                    type="text"
                    placeholder="Your Name"
                    value={userData.username}
                    // onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Email" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Contact Number" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    label="Contact Number"
                    name="phone_no"
                    type="text"
                    value={userData.phone_no}
                    placeholder="Contact Number"
                    onChange={handleChange}
                  />
                </div>
              </div>

            
              
            </div>

            <div className="flex flex-row-reverse pr-6 pb-6">
              <Button type="submit" className="h-12 px-6">
                {' '}
                Update Profile
              </Button>
            </div>
          </form>:
        "Loading"
        }
      </div>
    </>
  );
};

export default EditProfile;
