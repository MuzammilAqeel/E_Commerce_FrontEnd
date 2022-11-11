import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { imageUrl, url } from "../../baseUrl";
import DatatablePage from "../../components/DataTable/DataTable";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
// import CustomizedSnackbars from "../../Components/SnackBar/SnackBar";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import {
  darkButton,
  darkText,
  lightBackground,
  lightText,
  white,
} from "../../assets/Theme/ThemeColors";
import { useSelector } from "react-redux";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import BasicSelect from "../../Components/CustomSelect/Select";
import { Category } from "@mui/icons-material";
// import FormDialog from "../../Components/Popup/Popup";
// import CustomImage from "../../Components/Image/CustomImage";
import { BASE_URL } from "../constants/constants";
import axios from "axios";

const Cart = () => {
  const Navigate = useNavigate();

  const state = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart?.data);
  console.log("state", state);

  useEffect(() => {
    if (state?.userType == "Customer") {
      console.log("data");
    } else if (state?.userType == "Vendor") {
      console.log("data");
      Navigate("/product/list");
    } else {
      alert("session expired!");
      Navigate("/signin");
    }
  }, []);

  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [category, setCategory] = useState("animations");
  const [subCategory, setSubCategory] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState();

  let navigate = useNavigate();
  // const navigate = useNavigate();
  const handleClickOpen = (item) => {
    setSelectedContent({
      ...item,
    });
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);

    getAllContent();
  };
  useEffect(() => {
    getAllContent();
  }, []);

  const getAllContent = async () => {
    try {
      setIsLoaded(true);
      const response = await axios
        .get(
          `${BASE_URL}/project/filterProjects?category=${"illustrations"}&subCategory=${"logo"}`
        )
        .then((data) => {
          console.log("data images", data.data.data);

          setIsOpen(true);
          setMessage("Data Loaded!");
          setSeverity("success");
          setIsLoaded(false);
        });
    } catch (error) {
      console.log("error", error.message);
      setIsLoaded(false);
      setIsOpen(true);
      setMessage(error.message);
      setSeverity("error");
    }
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      <LandingNavbar />
      <Container
        style={{
          maxWidth: "100%",
          padding: "0px",
          overflowY: "scroll",
          height: "100vh",
          paddingTop: "9vh",
        }}
      >
        <Paper fullWidth sx={{ m: 1, p: 2, maxWidth: "100%" }}>
          <Grid container>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "flex-start" }}
              xs={6}
            >
              <Typography variant="h5" color={`${darkText} `}>
                Cart
              </Typography>
            </Grid>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "flex-end" }}
              xs={6}
            >
              <Button
                variant="contained"
                sx={{ background: "maroon", color: "white" }}
                onClick={() => {
                  Navigate("/checkout");
                }}
                disabled={cart == null}
              >

                check out
              </Button>
            </Grid>
          </Grid>

          <Grid container xs={12}>
            {cart ? (
              cart.map((c) => (
                <Grid item xs={6} sx={{ p: 2 }}>
                  <Paper
                    container
                    sx={{ background: "lightgrey", minHeight: "10vh" }}
                  >
                    <Grid item container xs={12}>
                      <Grid
                        item
                        xs={3}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "Center",
                          p: 2,
                        }}
                      >
                        <img src={c.imageUrl} width="100%" />
                      </Grid>
                      <Grid item xs={6} sx={{ p: 2 }}>
                        {" "}
                        <Typography variant="h6" gutterBottom>
                          Product Title : {c.title}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          Product Code : {c.pdid}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          Vendor Code : {c.vendor}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          Description : {c.description}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          Price : {c.price}
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{ background: "maroon", color: "white" }}
                        >
                          Remove From Cart
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={8}>
                <Paper
                  sx={{
                    background: "lightgrey",
                    minHeight: "20vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "Center",
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Cart is empty
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
      {/* <FormDialog
          open={openDialog}
          handleClose={handleClose}
          selectedContent={selectedContent}
        />
        <CustomizedSnackbars
          isOpen={isOpen}
          severity={severity}
          message={message}
        /> */}
    </>
  );
};

export default Cart;
