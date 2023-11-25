import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow } from '@windmill/react-ui';

import Status from '../table/Status';
import { FiZoomIn } from 'react-icons/fi';
import Tooltip from '../tooltip/Tooltip';
import SelectStatus from '../form/SelectStatus';
import { FiTrash2 } from 'react-icons/fi';
import { deleteOrder } from '../../Axios/Axios';
import { useHistory } from "react-router-dom";

const OrderTable = ({ orders }) => {
  // const navigation=useHistory();
  // const [resp,setResp]=useState();
  const getData = async () => {
    let response = await deleteOrder();
  };
  // console.log(orders)
  useEffect(()=>{
    // navigation.push('/orders')
    getData();
  },[])
  return (
    <>
      <TableBody>
        {orders.map((order, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{i + 1}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {dayjs(order.created_at).format('MMM D, YYYY')}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{order.payment_type}</span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm">${order.total_bill}</span>{' '}
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                {order.payment_type}
              </span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm font-semibold">
                ${Math.round(order.bill_payed)}.00
              </span>{' '}
            </TableCell>
            <TableCell className="text-center text-xs">
              {
                order.o_status=='In Process'?
                <span className="text-sm" style={{color:'red'}}>{order.o_status}</span>
                :
                <span className="text-sm" style={{color:'green'}}>{order.o_status}</span>

              }
            </TableCell>
            <TableCell className="text-center text-xs">
              {
                order.o_panel==1?
                <span className="text-sm" style={{color:'green'}}>B2C</span>
                :
                <span className="text-sm" style={{color:'green'}}>B2B</span>

              }
            </TableCell>
            <TableCell className="text-center">
              <SelectStatus id={order.o_id} order={order} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
