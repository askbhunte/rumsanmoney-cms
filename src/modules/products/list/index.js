import React from "react";
import { ProductContextProvider } from "../../../contexts/ProductContext";
import ListTable from "./ListTable";

const List = () => {
  return (
    <ProductContextProvider>
      <ListTable />
    </ProductContextProvider>
  );
};

export default List;
