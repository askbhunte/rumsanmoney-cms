import React from "react";
import { CategoryContextProvider } from "../../../contexts/CategoryContext";
import ListTable from "./ListTable";

const List = () => {
  return (
    <CategoryContextProvider>
      <ListTable />
    </CategoryContextProvider>
  );
};

export default List;
