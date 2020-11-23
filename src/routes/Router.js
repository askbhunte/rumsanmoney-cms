import { lazy } from "react";

const Dashboard = lazy(() => import("../modules/dashboard/Dashboard"));
const Banks = lazy(() => import("../modules/banks/list"));
const BankDetails = lazy(() => import("../modules/banks/details"));
const Products = lazy(() => import("../modules/products/list"));
const ProductDetails = lazy(() => import("../modules/products/details"));
const Categories = lazy(() => import("../modules/categories/Categories"));
const Blogs = lazy(() => import("../modules/blogs/Blogs"));
const Users = lazy(() => import("../modules/users/Users"));
const Settings = lazy(() => import("../modules/settings/Settings"));

var AppRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "home",
    component: Dashboard,
  },
  {
    path: "/banks",
    name: "Banks",
    icon: "dollar-sign",
    component: Banks,
    showInSidebar: true
  },
   {
    path: "/bank/:id",
    name: "Bank Details",
    icon: "umbrella",
    component: BankDetails
  },
  {
    path: "/products",
    name: "Products",
    icon: "layers",
    component: Products,
    showInSidebar: true
  },
  {
    path: "/product/:id",
    name: "Product Info",
    icon: "umbrella",
    component: ProductDetails
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "anchor",
    component: Categories,
    showInSidebar: true
  },
  {
    path: "/blogs",
    name: "Blogs",
    icon: "inbox",
    component: Blogs,
    showInSidebar: true
  },
  {
    collapse: true,
    path: "/dashboard",
    name: "Admin",
    state: "dashboardpages",
    icon: "lock",
    showInSidebar: true,
    child: [
      {
        path: "/settings",
        name: "Settings",
        icon: "anchor",
        component: Settings,
      },
      {
        path: "/users",
        name: "Users",
        icon: "inbox",
        component: Users,
      },
    ],
  },
  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true },

];
export default AppRoutes;
