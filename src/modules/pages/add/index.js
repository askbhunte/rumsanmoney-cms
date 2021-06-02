import React from "react";
import { PagesContextProvider } from "../../../contexts/PagesContext";
import Add from "./add";

const List = () => {
  return (
    <PagesContextProvider>
      <Add />
    </PagesContextProvider>
  );
};

export default List;
