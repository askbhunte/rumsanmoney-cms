import React from "react";

import DetailsForm from "./DetailsForm";
import { CategoryContextProvider } from "../../../contexts/CategoryContext";

const Details = (props) => {
  return (
    <CategoryContextProvider>
      <DetailsForm params={props.match.params} />
    </CategoryContextProvider>
  );
};

export default Details;
