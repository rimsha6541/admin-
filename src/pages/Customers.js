import React, {useState, useEffect} from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
  Pagination,
} from '@windmill/react-ui';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import NotFound from '../components/table/NotFound';
import UserServices from '../services/UserServices';
import Loading from '../components/preloader/Loading';
import PageTitle from '../components/Typography/PageTitle';
import CustomerTable from '../components/customer/CustomerTable';
import { getAllCustomers } from "../Axios/Axios";

const Customers = () => {
  const { data, loading } = useAsync(UserServices.getAllUsers);

  const {
    userRef,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitUser,
  } = useFilter(data);

  const [userData, setUserData] = useState([]);
  const getData = async () => {
    let response = await getAllCustomers();
    setUserData(response.allcustomers.data);
    // console.log("from customer");
    // console.log(response.allcustomers.data)
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageTitle>Customers</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
           
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>ID</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                {/* <TableCell className="text-right">Actions</TableCell> */}
              </tr>
            </TableHeader>
            <CustomerTable customers={userData} />
          </Table>
          {/* <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter> */}
        </TableContainer>
      ) : (
        <NotFound title="Customer" />
      )}
    </>
  );
};

export default Customers;
