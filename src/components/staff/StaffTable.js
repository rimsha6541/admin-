import React from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow, Avatar } from "@windmill/react-ui";

import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import StaffDrawer from "../drawer/StaffDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";

const StaffTable = ({ staffs }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} title={title} />
      <MainDrawer>
        <StaffDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {staffs?.map((item, index) => (
          <TableRow>
            <TableCell>
              <h2 className="text-sm font-medium">{index}</h2>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.username}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">{item?.email}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">{item?.phone_no}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default StaffTable;
