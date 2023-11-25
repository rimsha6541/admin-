import React, { useContext, useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
} from '@windmill/react-ui';
import { ImStack, ImCreditCard } from 'react-icons/im';
import { FiShoppingCart, FiTruck, FiRefreshCw, FiCheck} from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import OrderServices from '../services/OrderServices';
import Loading from '../components/preloader/Loading';
import ChartCard from '../components/chart/ChartCard';
import CardItem from '../components/dashboard/CardItem';
import PageTitle from '../components/Typography/PageTitle';
import OrderTable from '../components/dashboard/OrderTable';
import CardItemTwo from '../components/dashboard/CardItemTwo';
import SaleChart from '../components/chart/SaleChart';
import RevenueChart from '../components/chart/RevenueChart';
import { SidebarContext } from '../context/SidebarContext';
import { getAllOrders, getDashboard } from "../Axios/Axios";

const Dashboard = () => {
  dayjs.extend(isBetween);


  const [salesReport, setSalesReport] = useState([]);
  const [todayOrder, setTodayOrder] = useState(0);
  const { currentPage, handleChangePage } = useContext(SidebarContext);

  const { data, loading } = useAsync(() =>
    OrderServices.getDashboardOrdersData({
      page: currentPage,
      limit: 8,
    })
  );
  const [userData, setUserData] = useState([]);
  const getData = async () => {
    let response = await getAllOrders();
    setUserData(response.data);
  };
  // console.log(userData);
  const [dashboardData, setDashboardData] = useState([]);
  const getDashboardData = async () => {
    let response = await getDashboard();
    setDashboardData(response.data);
  };
  // console.log(dashboardData);


  
  const { dataTable } = useFilter(data?.orders);

  useEffect(() => {
    getData();
    getDashboardData();
    const todayOrderTotal = data?.todayOrder?.reduce(
      (pre, acc) => pre + acc.total,
      0
    );
    setTodayOrder(todayOrderTotal);
    data?.weeklySaleReport?.reduce((res, value) => {
      let onlyDate = value.createdAt.split('T')[0];

      if (!res[onlyDate]) {
        res[onlyDate] = { date: onlyDate, total: 0, order: 0 };
        salesReport.push(res[onlyDate]);
      }
      res[onlyDate].total += value.total;
      res[onlyDate].order += 1;
      return res;
    }, {});
  }, [data?.todayOrder, data?.weeklySaleReport, salesReport]);

  return (
    <>
      <PageTitle>Dashboard Overview</PageTitle>

      <div className="grid gap-4 mb-8 md:grid-cols-3 xl:grid-cols-3">
        <CardItemTwo
          title="Today Order"
          Icon={ImStack}
          price={(dashboardData.todayorders) ? dashboardData.todayorders : 0}
          className="text-white dark:text-green-100 bg-teal-500"
        />
        <CardItemTwo
          title="This Month"
          Icon={FiShoppingCart}
          price={(dashboardData.monthorders) ? dashboardData.monthorders : 0}
          className="text-white dark:text-green-100 bg-blue-500"
        />
        <CardItemTwo
          title="Total Order"
          Icon={ImCreditCard}
          price={(dashboardData.ordercount) ? dashboardData.ordercount : 0}

          className="text-white dark:text-green-100 bg-green-500"
        />
        <CardItemTwo
          title="Today Customer"
          Icon={AiOutlineUser}
          price={(dashboardData.todaycustomers) ? dashboardData.todaycustomers : 0}
          className="text-purple-100 dark:text-purple-600 bg-purple-500 dark:bg-purple-100"
         />
        <CardItemTwo
          title="This Month Customer"
          Icon={AiOutlineUser}
          price={(dashboardData.monthcustomers) ? dashboardData.monthcustomers : 0}
          className="text-yellow-100 dark:text-yellow-600 bg-yellow-500 dark:bg-yellow-100"
          />
        
        <CardItemTwo
          title="Total Customer"
          Icon={AiOutlineUser}
          price={(dashboardData.customercount) ? dashboardData.customercount : 0}
          className="text-orange-100 dark:text-orange-600 bg-orange-500 dark:bg-orange-100"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title="Total Order"
          Icon={FiShoppingCart}
          quantity={(dashboardData.ordercount) ? dashboardData.ordercount : 0}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
        <CardItem
          title="Order Processing"
          Icon={FiTruck}
          quantity={(dashboardData.processing) ? dashboardData.processing : 0}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
        <CardItem
          title="Order Delivered"
          Icon={FiCheck}
          quantity={(dashboardData.delivered) ? dashboardData.delivered : 0}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 my-8">
        <ChartCard title="Weekly Sales">
          <SaleChart salesReport={userData} />
        </ChartCard>
        {/* <ChartCard title="Best Selling Products"> */}
          <RevenueChart />
        {/* </ChartCard> */}
      </div>
    </>
  );
};

export default Dashboard;
