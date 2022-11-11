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
import { BASE_URL, imgUrl } from "../constants/constants";
import axios from "axios";

const ProductsList = () => {
  const Navigate = useNavigate();
  const cart = useSelector((state) => state.cart?.data);

  const state = useSelector((state) => state.user.data);
  console.log("state", state);

  useEffect(() => {
    if (state?.userType == "Vendor") {
      console.log("data");
    } else if (state?.userType == "Customer") {
      console.log("data");
      Navigate("/cart");
    } else {
      alert("session expired!");
      Navigate("/signin");
    }
  }, []);

  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [category, setCategory] = useState("animations");
  const [subCategory, setSubCategory] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState();

  const [categoryOpt, setCategoryOpt] = useState([
    {
      key: "animation",
      value: "Animation",
    },
    {
      key: "illustrations",
      value: "Illustrations",
    },
    {
      key: "graphicdesigning",
      value: "Graphic Designing",
    },
    {
      key: "bookillustration",
      value: "Book Illustration",
    },
  ]);
  const [subCategoryOpt, setSubCategoryOpt] = useState([
    {
      key: "animation",
      value: "Animation",
    },
    {
      key: "illustrations",
      value: "Illustrations",
    },
    {
      key: "graphicdesigning",
      value: "Graphic Designing",
    },
    {
      key: "bookillustration",
      value: "Book Illustration",
    },
  ]);
  let navigate = useNavigate();
  // const navigate = useNavigate();
  var [isLoaded, setIsLoaded] = useState(false);
  var [products, setProducts] = useState();

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/project/getAll`);
      console.log("response", response);
      if (response.data.success) {
        setProducts(
          response.data.data.map((prod) => {
            return {
              ...prod,
              pdid: prod._id,
              imageUrl: `${imgUrl}/${prod.fileData[0]}`,
            };
          })
        );
        setIsLoaded(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
                All Products
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
                  Navigate("/product");
                }}
              >
                Post New Product
              </Button>
            </Grid>
          </Grid>

          <Grid container xs={12}>
            {isLoaded ? (
              products ? (
                products.map((c) => (
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
                        <Grid item xs={9} sx={{ p: 2 }}>
                          {" "}
                          <Typography variant="subtitle2" gutterBottom>
                            Product Title : {c.title}
                          </Typography>
                          <Typography variant="subtitle2" gutterBottom>
                            Product Code : {c.pdid}
                          </Typography>
                          <Typography variant="subtitle2" gutterBottom>
                            Vendor Code : {c.vendor}
                          </Typography>
                          <Typography variant="subtitle2" gutterBottom>
                            Description : {c.description}
                          </Typography>
                          <Typography variant="subtitle2" gutterBottom>
                            Price : {c.price}
                          </Typography>
                          {/* <Button
                            variant="contained"
                            sx={{ background: "maroon", color: "white" }}
                          >
                            Remove From Cart
                          </Button> */}
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
              )
            ) : (
              <Typography variant="h3" gutterBottom>
                LOADING...
              </Typography>
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

export default ProductsList;
