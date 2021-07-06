import React from "react";
import { BankContextProvider } from "../../../contexts/BankContext";
import { ProductContextProvider } from "../../../contexts/ProductContext";
import ListTable from "./ListTable";

const List = () => {
  return (
    <BankContextProvider>
    <ProductContextProvider>
      <ListTable />
    </ProductContextProvider>
    </BankContextProvider>
  );
};

export default List;
