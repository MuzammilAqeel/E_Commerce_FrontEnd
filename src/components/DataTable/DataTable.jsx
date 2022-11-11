import React from "react";
import { MDBDataTable } from "mdbreact";
import { CircularProgress} from "@mui/material";

const DatatablePage = ({  data, isLoaded }) => {
  console.log("data table", data);
  return isLoaded == false ? (
    <MDBDataTable  hover responsive bordered data={data} />
  ) : (
    <CircularProgress />
  );
};

export default DatatablePage;
