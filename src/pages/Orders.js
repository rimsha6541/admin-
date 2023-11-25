import React, { useContext, useEffect, useState } from 'react';
import { CSVDownloader } from 'react-papaparse';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Card,
  CardBody,
  Pagination,
} from '@windmill/react-ui';
import { IoCloudDownloadOutline } from 'react-icons/io5';

import orderData from '../utils/orders';
import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import NotFound from '../components/table/NotFound';
import OrderServices from '../services/OrderServices';
import Loading from '../components/preloader/Loading';
import OrderTable from '../components/order/OrderTable';
import PageTitle from '../components/Typography/PageTitle';
import { SidebarContext } from '../context/SidebarContext';
import { getAllOrders } from "../Axios/Axios";

const Orders = () => {
  const {
    time,
    setTime,
    currentPage,
    searchText,
    searchRef,
    status,
    setStatus,
    handleChangePage,
    handleSubmitForAll,
    resultsPerPage,
  } = useContext(SidebarContext);

  const { data, loading } = useAsync(() =>
    OrderServices.getAllOrders({
      contact: searchText,
      status,
      page: currentPage,
      limit: resultsPerPage,
      day: time,
    })
  );

  const { dataTable, serviceData} = useFilter(data?.orders);
  const [userData, setUserData] = useState([]);
  const getData = async () => {
    let response = await getAllOrders();
    setUserData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <PageTitle>Orders</PageTitle>
      

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>SR NO</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Total Bill</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Amount Payed</TableCell>
                <TableCell className="text-center">Status</TableCell>
                <TableCell className="text-center">Panel</TableCell>
                <TableCell className="text-center">Action</TableCell>
                {/* <TableCell className="text-right">Update</TableCell> */}
                {/* <TableCell className="text-right">Delete</TableCell> */}
              </tr>
            </TableHeader>
            <OrderTable orders={userData} />
          </Table>
          {/* <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={10}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter> */}
        </TableContainer>
      ) : (
        <NotFound title="Order" />
      )}
    </>
  );
};

export default Orders;
