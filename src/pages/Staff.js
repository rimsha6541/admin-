import React, { useContext, useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { FiPlus } from "react-icons/fi";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import Loading from "../components/preloader/Loading";
import StaffTable from "../components/staff/StaffTable";
import AdminServices from "../services/AdminServices";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import PageTitle from "../components/Typography/PageTitle";
import MainDrawer from "../components/drawer/MainDrawer";
import StaffDrawer from "../components/drawer/StaffDrawer";
import { getAllUsers } from "../Axios/Axios";

const Staff = () => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { toggleDrawer } = useContext(SidebarContext);

  const { data, loading } = useAsync(() =>
    AdminServices.getAllStaff({ email: adminInfo?.email })
  );

  const {
    userRef,
    setRole,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitUser,
  } = useFilter(data);

  const [userData, setUserData] = useState();

  const getData = async () => {
    let response = await getAllUsers();
    setUserData(response);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageTitle>Sellers</PageTitle>
      <MainDrawer>
        <StaffDrawer />
      </MainDrawer>

     

      <TableContainer className="mb-8 rounded-b-lg">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
            </tr>
          </TableHeader>
          <StaffTable staffs={userData?.allseller} />
        </Table>
        {/* <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={handleChangePage}
            label="Table navigation"
          /> */}
        {/* </TableFooter> */}
      </TableContainer>
    </>
  );
};

export default Staff;
