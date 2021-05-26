import React from "react";

import DetailsForm from "./DetailsForm";
import { PagesContextProvider } from "../../../contexts/PagesContext";

const Details = (props) => {
    return (
        <PagesContextProvider>
            <DetailsForm params={props.match.params} />
        </PagesContextProvider>
    );
};

export default Details;