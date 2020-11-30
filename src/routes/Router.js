import { lazy } from "react";

const Dashboard = lazy(() => import("../modules/dashboard/Dashboard"));
const Banks = lazy(() => import("../modules/banks/list"));
const BankDetails = lazy(() => import("../modules/banks/details"));
const Products = lazy(() => import("../modules/products/list"));
const ProductDetails = lazy(() => import("../modules/products/details"));
const Categories = lazy(() => import("../modules/categories/list"));
const CategoryDetails = lazy(() => import("../modules/categories/details"));
const Blogs = lazy(() => import("../modules/blogs/Blogs"));
const Requests = lazy(() => import("../modules/requests/Requests"));
const Users = lazy(() => import("../modules/users/Users"));
const Settings = lazy(() => import("../modules/settings/Settings"));

var AppRoutes = [
  {
    path: "/requests",
    name: "Requests",
    icon: "inbox",
    component: Requests,
    showInSidebar: true
  },
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
    icon: "gift",
    component: Products,
    showInSidebar: true
  },
  {
    path: "/product/:id",
    name: "Product Info",
    icon: "gift",
    component: ProductDetails
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "layers",
    component: Categories,
    showInSidebar: true
  },
  {
    path: "/category/:id",
    name: "Category Detail",
    icon: "layers",
    component: CategoryDetails
  },
  {
    path: "/blogs",
    name: "Blogs",
    icon: "book-open",
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
  { path: "/", pathTo: "/banks", name: "Bank List", redirect: true },

];
export default AppRoutes;
