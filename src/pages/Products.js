import React, { useContext, useEffect, useState } from 'react';
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
} from '@windmill/react-ui';
import { FiPlus } from 'react-icons/fi';
import { CSVReader, CSVDownloader } from 'react-papaparse';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import productData from '../utils/products';
import NotFound from '../components/table/NotFound';
import Loading from '../components/preloader/Loading';
import ProductServices from '../services/ProductServices';
import PageTitle from '../components/Typography/PageTitle';
import { SidebarContext } from '../context/SidebarContext';
import ProductTable from '../components/product/ProductTable';
import SelectCategory from '../components/form/SelectCategory';
import MainDrawer from '../components/drawer/MainDrawer';
import ProductDrawer from '../components/drawer/ProductDrawer';
import { getAllProducts } from "../Axios/Axios";

const Products = () => {
  const {
    toggleDrawer,
    currentPage,
    handleChangePage,
    searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
  } = useContext(SidebarContext);

  const { data, loading } = useAsync(() =>
    ProductServices.getAllProducts({
      page: currentPage,
      limit: limitData,
      category: category,

      title: searchText,
      price: sortedField,
    })
  );

  const { serviceData, handleOnDrop, handleUploadProducts } = useFilter(
    data?.products
  );
  const [userData, setUserData] = useState([]);
  const getData = async () => {
    let response = await getAllProducts();
    setUserData(response.allproducts);
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <PageTitle>Products</PageTitle>
      <MainDrawer>
        <ProductDrawer />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            
            
           
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Product
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0">
        <CardBody>
          {/* <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3">
            <div className="col-span-2">
              <CSVReader
                onDrop={handleOnDrop}
                addRemoveButton
                config={{
                  header: true,
                }}
                style={{
                  dropArea: {
                    borderColor: 'green',
                    borderRadius: 6,
                    borderWidth: 1,
                    height: '3em',
                    padding: '0 0.2em',
                  },
                  dropAreaActive: {
                    borderColor: 'green',
                  },
                  dropFile: {
                    width: '100%',
                    display: 'block',
                    height: 'auto',
                    background: 'none',
                    borderRadius: 6,
                    padding: '0.2em 0.2em',
                  },
                  fileSizeInfo: {
                    color: '#fff',
                    backgroundColor: '#000',
                    borderRadius: 0,
                    lineHeight: 1,
                    fontSize: 12,
                    marginBottom: '0.5em',
                    padding: '0.3em 0.2em',
                  },
                  fileNameInfo: {
                    color: '#757575',
                    backgroundColor: 'transparent',
                    borderRadius: 1,
                    fontSize: 14,
                    lineHeight: 1,
                    padding: '0 0.4em',
                  },
                  removeButton: {
                    color: 'red',
                  },
                  progressBar: {
                    backgroundColor: 'green',
                  },
                }}
              >
                <span className="text-sm text-gray-500">Drop CSV file</span>
              </CSVReader>
            </div>
            <div className="flex items-center">
              <Button onClick={handleUploadProducts} layout="outline">
                Upload
              </Button>
              <div className="w-full">
                <CSVDownloader data={productData} filename={'products'}>
                  <Button className="w-full h-12">Download</Button>
                </CSVDownloader>
              </div>
            </div>
          </div> */}
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>SKU</TableCell>
                <TableCell>Product name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Brand</TableCell>
                {/* <TableCell>Update</TableCell> */}
                {/* <TableCell className="text-right">More Actions</TableCell> */}
              </tr>
            </TableHeader>
            <ProductTable products={userData} />
          </Table>
          {/* <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={15}
              onChange={handleChangePage}
              label="Product Page Navigation"
            />
          </TableFooter> */}
        </TableContainer>
      ) : (
        <NotFound title="Product" />
      )}
    </>
  );
};

export default Products;
