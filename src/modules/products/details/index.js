import React from "react";

import DetailsForm from "./DetailsForm";
import { ProductContextProvider } from "../../../contexts/ProductContext";

const Details = (props) => {
  return (
    <ProductContextProvider>
      <DetailsForm params={props.match.params} />
    </ProductContextProvider>
  );
};


export default Details;
