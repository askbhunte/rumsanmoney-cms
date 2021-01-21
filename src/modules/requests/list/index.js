import React from "react";
import { RequestContextProvider } from "../../../contexts/RequestContext";
import ListTable from "./ListTable";

const List = () => {
  return (
    <RequestContextProvider>
      <ListTable />
    </RequestContextProvider>
  );
};

export default List;
