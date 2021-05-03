import { lazy } from "react";

const Dashboard = lazy(() => import("../modules/dashboard/Dashboard"));
const Banks = lazy(() => import("../modules/banks/list"));
const BankDetails = lazy(() => import("../modules/banks/details"));
const Products = lazy(() => import("../modules/products/list"));
const ProductDetails = lazy(() => import("../modules/products/details"));
const Categories = lazy(() => import("../modules/categories/list"));
const CategoryDetails = lazy(() => import("../modules/categories/details"));
const Blogs = lazy(() => import("../modules/blogs/list"));
const BlogsDetails = lazy(() => import("../modules/blogs/details"));
const Users = lazy(() => import("../modules/users/List"));
const Requests = lazy(() => import("../modules/requests/list"));
const Settings = lazy(() => import("../modules/settings/Settings"));

var AppRoutes = [
  {
    path: "/requests",
    name: "Requests",
    icon: "inbox",
    component: Requests,
    showInSidebar: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "home",
    component: Dashboard,
  },
  {
    collapse: true,
    path: "/dashboard",
    name: "Banks",
    state: "bankPages",
    icon: "dollar-sign",
    showInSidebar: true,
    child: [
      {
        path: "/banks",
        name: "Banks",
        icon: "dollar-sign",
        component: Banks,
        showInSidebar: true,
      },
      {
        path: "/products",
        name: "Products",
        icon: "gift",
        component: Products,
        showInSidebar: true,
      },
    ],
  },
  {
    collapse: true,
    path: "/dashboard",
    name: "Insurances",
    state: "insurancePages",
    icon: "gift",
    showInSidebar: true,
    child: [
      {
        path: "/banks",
        name: "Companies",
        component: Banks,
      },
      {
        path: "/products",
        name: "Products",
        component: Products,
      },
    ],
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "layers",
    component: Categories,
    showInSidebar: true,
  },
  {
    path: "/blogs",
    name: "Blogs",
    icon: "book-open",
    component: Blogs,
    showInSidebar: true,
  },
  {
    path: "/bank/:id",
    name: "Bank Details",
    icon: "umbrella",
    component: BankDetails,
  },
  {
    path: "/product/:id",
    name: "Product Info",
    icon: "gift",
    component: ProductDetails,
  },
  {
    path: "/category/:id",
    name: "Category Detail",
    icon: "layers",
    component: CategoryDetails,
  },
  {
    path: "/blog/:id",
    name: "Blog Detail",
    icon: "layers",
    component: BlogsDetails,
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
