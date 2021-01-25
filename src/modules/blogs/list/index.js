import React from "react";
import { BlogContextProvider } from "../../../contexts/BlogContext";
import ListTable from "./ListTable";

const List = () => {
  return (
    <BlogContextProvider>
      <ListTable />
    </BlogContextProvider>
  );
};

export default List;
