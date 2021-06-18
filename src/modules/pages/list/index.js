import React from "react";
import { PagesContextProvider } from "../../../contexts/PagesContext";
import ListTable from "./ListTable";

const List = () => {
    return (
        <PagesContextProvider>
            <ListTable />
        </PagesContextProvider>
    );
};

export default List;
