import { lazy } from 'react';

// use lazy for better code splitting
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Category = lazy(() => import('../pages/Category'));
const Staff = lazy(() => import('../pages/Staff'));
const Customers = lazy(() => import('../pages/Customers'));
const CustomerOrder = lazy(() => import('../pages/CustomerOrder'));
const Orders = lazy(() => import('../pages/Orders'));
const OrderInvoice = lazy(() => import('../pages/OrderInvoice'));
const Coupons = lazy(() => import('../pages/Coupons'));
// const Setting = lazy(() => import("../pages/Setting"));
const Page404 = lazy(() => import('../pages/404'));
const ComingSoon = lazy(() => import('../pages/ComingSoon'));
const EditProfile = lazy(() => import('../pages/EditProfile'));
const AuthorizedComponent=lazy(()=>import('../components/AuthorizedComponent'))

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: '/dashboard',
    component: ()=> <AuthorizedComponent Component={Dashboard}/>,
  },
  {
    path: '/products',
    component: ()=> <AuthorizedComponent Component={Products}/>,
  },
  {
    path: '/product/:id',
    component: ()=> <AuthorizedComponent Component={ProductDetails}/>,
  },
  {
    path: '/category',
    component: ()=> <AuthorizedComponent Component={Category}/>,
  },
  {
    path: '/customers',
    component: ()=> <AuthorizedComponent Component={Customers}/>,
  },
  {
    path: '/customer-order/:id',
    component: ()=> <AuthorizedComponent Component={CustomerOrder}/>,
  },
  {
    path: '/our-staff',
    component: ()=> <AuthorizedComponent Component={Staff}/>,
  },
  {
    path: '/orders',
    component: ()=> <AuthorizedComponent Component={Orders}/>,
  },
  {
    path: '/order/:id',
    component: OrderInvoice,
  },
  {
    path: '/coupons',
    component: Coupons,
  },
  { path: '/setting',
   component: ()=> <AuthorizedComponent Component={EditProfile}/>
   },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/coming-soon',
    component: ComingSoon,
  },
  {
    path: '/edit-profile',
    component: ()=> <AuthorizedComponent Component={EditProfile}/>,
  },
];

export default routes;
