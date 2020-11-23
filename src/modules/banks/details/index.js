import React from "react";

import DetailsForm from "./DetailsForm";
import { BankContextProvider } from "../../../contexts/BankContext";

const Details = (props) => {
  return (
    <BankContextProvider>
      <DetailsForm params={props.match.params} />
    </BankContextProvider>
  );
};

export default Details;
