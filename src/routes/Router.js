import { lazy } from "react";

const Dashboard = lazy(() => import("../modules/dashboard/Dashboard"));
const Banks = lazy(() => import("../modules/banks/list"));
const BankDetails = lazy(() => import("../modules/banks/details"));
const Blogs = lazy(() => import("../modules/blogs/list"));
const BlogsDetails = lazy(() => import("../modules/blogs/details"));
const Categories = lazy(() => import("../modules/categories/list"));
const CategoryDetails = lazy(() => import("../modules/categories/details"));
const Insurances = lazy(() => import("../modules/insurances/list"));
const InsuranceDetails = lazy(() => import("../modules/insurances/details"));
const Companies = lazy(() => import("../modules/insurance_companies/list"));
const CompanyAdd = lazy(() => import("../modules/insurance_companies/add"));
const CompanyDetails = lazy(() => import("../modules/insurance_companies/details"));
const Products = lazy(() => import("../modules/products/list"));
const ProductDetails = lazy(() => import("../modules/products/details"));
const Requests = lazy(() => import("../modules/requests/list"));
const Settings = lazy(() => import("../modules/settings/Settings"));
const Users = lazy(() => import("../modules/users/List"));
const Pages = lazy(() => import("../modules/pages/list"));


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
        path: "/companies",
        name: "Companies",
        component: Companies,
      },
      {
        path: "/insurances",
        name: "Products",
        component: Insurances,
      },
    ],
  },
  {
    path: "/newcompany",
    name: "CompanyAdd",
    component: CompanyAdd,
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
    path: "/company/:id",
    name: "Company Details",
    icon: "umbrella",
    component: CompanyDetails,
  },
  {
    path: "/insurance/:id",
    name: "Insurance Details",
    icon: "umbrella",
    component: InsuranceDetails,
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
    path: "/pages",
    name: "Pages",
    icon: "edit",
    component: Pages,
    showInSidebar: true,
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
