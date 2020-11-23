import React from "react";
import { BankContextProvider } from "../../../contexts/BankContext";
import ListTable from "./ListTable";

const List = () => {
  return (
    <BankContextProvider>
      <ListTable />
    </BankContextProvider>
  );
};

export default List;
