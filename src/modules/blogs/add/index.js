import React from "react";
import { BlogContextProvider } from "../../../contexts/BlogContext";
import Add from "./add";

const List = () => {
  return (
    <BlogContextProvider>
      <Add />
    </BlogContextProvider>
  );
};

export default List;
