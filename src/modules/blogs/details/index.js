import React from "react";

import DetailsForm from "./DetailsForm";
import { BlogContextProvider } from "../../../contexts/BlogContext";

const Details = (props) => {
  return (
    <BlogContextProvider>
      <DetailsForm params={props.match.params} />
    </BlogContextProvider>
  );
};

export default Details;
