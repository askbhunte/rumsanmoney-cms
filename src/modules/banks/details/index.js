import React from "react";

import DetailsForm from "./DetailsForm";
import { BankContextProvider } from "../../../contexts/BankContext";
import { ProductContextProvider } from "../../../contexts/ProductContext";

const Details = (props) => {
  return (
    <BankContextProvider>
      <ProductContextProvider>
        <DetailsForm params={props.match.params} />
      </ProductContextProvider>
    </BankContextProvider>
  );
};

export default Details;
