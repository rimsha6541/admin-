import React, { useContext } from 'react';
import { Select } from '@windmill/react-ui';

import OrderServices from '../../services/OrderServices';
import { notifySuccess, notifyError } from '../../utils/toast';
import { SidebarContext } from '../../context/SidebarContext'; 
import { UpdateOrderStatus } from '../../Axios/Axios';
import { useState } from 'react';

const SelectStatus = ({ id, order }) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const [response,setResponse]= useState('');
  

  const handleChangeStatus = async (id, status) => {
    let response = await UpdateOrderStatus(id, status);
    setResponse(response)
  };

  return (
    <>
      <Select
        onChange={(e) => handleChangeStatus(id, e.target.value)}
        className="border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none"
      >
        <option value="status" defaultValue hidden>
          {order?.o_status}
        </option>
        <option defaultValue={order?.o_status === 'Delivered'} value="Delivered">
          Delivered
        </option>
        
        <option
          defaultValue={order?.o_status === 'In Process'}
          value="In Process"
        >
          Processing
        </option>
       
      </Select>
    </>
  );
};

export default SelectStatus;
