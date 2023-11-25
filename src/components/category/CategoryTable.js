import React from 'react';
import { TableBody, TableRow, TableCell, Avatar } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import ShowHideButton from '../table/ShowHideButton';
import CategoryDrawer from '../drawer/CategoryDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';

const CategoryTable = ({ categories }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
console.log(categories,"sak");
  return (
    <>
      <MainModal id={serviceId} title={title} />
      <MainDrawer>
        <CategoryDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {categories.map((parent) => (
          <TableRow key={parent.cat_id}>
            <TableCell className="font-semibold uppercase text-xs">
              {parent.cat_id}
            </TableCell>
            <TableCell>
              <Avatar
                className="hidden mr-3 md:block bg-gray-50 p-1"
                src={"http://127.0.0.1:8000/" + parent.cat_image}
                alt={parent.parent}
              />
            </TableCell>
            
            <TableCell className="text-sm ">{parent.cat_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;
